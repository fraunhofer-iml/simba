/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import {
  AllInvoicesFilterAmqpDto,
  CompanyAndInvoiceAmqpDto,
  InvoiceAmqpDto,
  InvoiceIdAndPaymentStateAmqpDto,
  PaymentStatusAmqpDto,
} from '@ap3/amqp';
import { CreateInvoiceDto } from '@ap3/api';
import { ConfigurationService } from '@ap3/config';
import {
  InvoiceDatabaseAdapterService,
  InvoiceForZugferd,
  InvoiceWithOrderBuyerRef,
  NftPrismaService,
  OfferPrismaService,
  OrderDatabaseAdapterService,
  OrderWithDependencies,
} from '@ap3/database';
import { S3Service } from '@ap3/s3';
import { OfferStatesEnum, PAYMENT_DEADLINE_IN_DAYS, PAYMENT_TERMS, PaymentStates, VAT_IN_PERCENT } from '@ap3/util';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Invoice, Offer, PaymentStatus } from '@prisma/client';
import { PaymentManagementService } from './payment-management/payment-management.service';
import { InvoicesZugferdService } from './zugferd/invoices-zugferd.service';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  constructor(
    private readonly nftPrismaService: NftPrismaService,
    private readonly invoiceAdapterService: InvoiceDatabaseAdapterService,
    private readonly orderDatabaseAdapterService: OrderDatabaseAdapterService,
    private readonly offerPrismaService: OfferPrismaService,
    private readonly invoiceZugferdService: InvoicesZugferdService,
    private readonly paymentStatesService: PaymentManagementService,
    private readonly config: ConfigurationService,
    private readonly s3Service: S3Service
  ) {}

  async findAll(filterParams: AllInvoicesFilterAmqpDto): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all invoices for ${util.inspect(filterParams)}`);
    try {
      const possibleInvoiceIds: string[] = [];
      const rawInvoices: Invoice[] = await this.invoiceAdapterService.getInvoicesForFilterParams(
        filterParams.paymentStates,
        filterParams.creditorId,
        filterParams.debtorId,
        filterParams.invoiceNumber,
        filterParams.dueDateFrom,
        filterParams.dueDateTo
      );
      if (!rawInvoices || rawInvoices.length == 0) {
        this.logger.verbose(`No invoices found for the filter parameters ${JSON.stringify(filterParams)}`);
        return [];
      }

      for (const iv of rawInvoices) {
        possibleInvoiceIds.push(iv.id);
      }

      const invoices: InvoiceWithOrderBuyerRef[] = await this.invoiceAdapterService.getInvoicesCorrespondingToFilterParams(
        filterParams,
        possibleInvoiceIds
      );

      if (!invoices || invoices.length == 0) {
        this.logger.verbose(`No invoices found for the filter parameters ${JSON.stringify(filterParams)}`);
        return [];
      }
      return this.loadAssociatedDataAndConvertToDTO(invoices);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findOne(params: CompanyAndInvoiceAmqpDto): Promise<InvoiceAmqpDto> {
    const invoice: InvoiceWithOrderBuyerRef = await this.invoiceAdapterService.getInvoiceById(params.invoiceId, params.companyId);

    return (await this.loadAssociatedDataAndConvertToDTO([invoice]))[0];
  }

  async createAndUploadZugferdPDF(params: CompanyAndInvoiceAmqpDto) {
    const invoice: InvoiceForZugferd = await this.invoiceAdapterService.getInvoiceByIdForZugferd(params.invoiceId, params.companyId);
    const pdfFile: Uint8Array = await this.invoiceZugferdService.generatePdf(invoice);

    const fileName = `${invoice.invoiceNumber}.pdf`;
    await this.s3Service.uploadPdf(Buffer.from(pdfFile.buffer), fileName);

    await this.invoiceAdapterService.updateInvoiceURL(params.invoiceId, fileName);
    return fileName;
  }

  private async loadAssociatedDataAndConvertToDTO(invoices: InvoiceWithOrderBuyerRef[]): Promise<InvoiceAmqpDto[]> {
    const invoiceDtos: InvoiceAmqpDto[] = [];

    for (const invoice of invoices) {
      const trStates: PaymentStatus[] = await this.invoiceAdapterService.getPaymentStatesForInvoice(invoice.id);

      invoiceDtos.push(InvoiceAmqpDto.fromPrismaEntity(invoice, trStates, this.config.getMinioConfig().objectStorageURL));
    }
    return invoiceDtos;
  }

  async createPaymentStatusForInvoice(statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    try {
      const createdToken = await this.paymentStatesService.createPaymentStateAndUpdateNft(statusChanges);
      return !!createdToken;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  private generateInvoiceNumber(): string {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: string = String(now.getMonth() + 1).padStart(2, '0');
    const day: string = String(now.getDate()).padStart(2, '0');
    const hours: number = now.getHours();
    const minutes: number = now.getMinutes();
    const seconds: number = now.getSeconds();

    return `${this.config.getMinioConfig().invoicePrefix}${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  public async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceAmqpDto> {
    const offers: Offer[] = await this.offerPrismaService.getOffersByOrderId(createInvoiceDto.orderId);
    const acceptedOffer: Offer = offers.find((offer: Offer) => offer.status === OfferStatesEnum.ACCEPTED.toString());

    if (!acceptedOffer) {
      throw new NotFoundException(createInvoiceDto.orderId);
    }

    const orderOverview: OrderWithDependencies = await this.orderDatabaseAdapterService.getOrder(createInvoiceDto.orderId);
    const dueDate: Date = new Date();
    dueDate.setDate(dueDate.getDate() + PAYMENT_DEADLINE_IN_DAYS);

    const requestedQuantity: number = Number(orderOverview.orderLines[0].requestedQuantity) || 1;
    const netPricePerUnit: number =
      (Number(acceptedOffer.basicPrice) + Number(acceptedOffer.utilization) + Number(acceptedOffer.timeToProduction)) / requestedQuantity;
    const totalAmountWithoutVat: number = netPricePerUnit * requestedQuantity;

    const newInvoiceInput: InvoiceAmqpDto = new InvoiceAmqpDto(
      '',
      orderOverview.buyer.id,
      orderOverview.seller.id,
      orderOverview.id,
      '',
      '',
      totalAmountWithoutVat,
      new PaymentStatusAmqpDto(PaymentStates.OPEN, new Date()),
      this.generateInvoiceNumber(),
      dueDate,
      '',
      orderOverview.vatCurrency,
      orderOverview.orderLines[0].unitOfMeasureCodeAgreed,
      String(netPricePerUnit),
      String(VAT_IN_PERCENT),
      PAYMENT_TERMS,
      orderOverview.serviceProcess.id
    );
    const newInvoice: Invoice = await this.invoiceAdapterService.createInvoice(newInvoiceInput);
    const newInvoiceWithNft: InvoiceWithOrderBuyerRef = { ...newInvoice, serviceProcess: null };
    return InvoiceAmqpDto.fromPrismaEntity(
      newInvoiceWithNft,
      [
        {
          invoiceId: '',
          status: newInvoiceInput.status.status,
          timestamp: newInvoiceInput.status.timestamp,
        },
      ],
      this.config.getMinioConfig().objectStorageURL
    );
  }
}
