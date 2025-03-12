/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import { AllInvoicesFilterAmqpDto, CompanyAndInvoiceAmqpDto, InvoiceAmqpDto, InvoiceIdAndPaymentStateAmqpDto } from '@ap3/amqp';
import { ConfigurationService } from '@ap3/config';
import { InvoiceDatabaseAdapterService, InvoiceForZugferd, InvoiceWithNFT, TradeReceivablePrismaService } from '@ap3/database';
import { S3Service } from '@ap3/s3';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PaymentStatus, TradeReceivable } from '@prisma/client';
import { InvoicesZugferdService } from './zugferd/invoices-zugferd.service';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  constructor(
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly invoicePrismaService: InvoiceDatabaseAdapterService,
    private readonly invoiceZugferdService: InvoicesZugferdService,
    private readonly config: ConfigurationService,
    private readonly s3Service: S3Service
  ) {}

  async findAll(filterParams: AllInvoicesFilterAmqpDto): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables for ${util.inspect(filterParams)}`);
    try {
      const possibleInvoiceIds: string[] = [];
      if (filterParams.paymentState) {
        const tradeReceivables: TradeReceivable[] = await this.tradeReceivablePrismaService.getTradeReceivableByPaymentStatus(
          filterParams.paymentState,
          filterParams.creditorId,
          filterParams.debtorId
        );
        if (!tradeReceivables || tradeReceivables.length == 0) {
          this.logger.verbose(`No invoices found for payment state ${filterParams.paymentState}`);
          return [];
        }
        for (const tr of tradeReceivables) {
          possibleInvoiceIds.push(tr.invoiceId);
        }
      }
      const invoices: InvoiceWithNFT[] = await this.invoicePrismaService.getInvoicesCorrespondingToFilterParams(
        filterParams,
        possibleInvoiceIds
      );
      return this.loadAssociatedDataAndConvertToDTO(invoices);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findOne(params: CompanyAndInvoiceAmqpDto): Promise<InvoiceAmqpDto> {
    const invoice: InvoiceWithNFT = await this.invoicePrismaService.getInvoiceById(params.invoiceId, params.companyId);

    return (await this.loadAssociatedDataAndConvertToDTO([invoice]))[0];
  }

  async createAndUploadZugferdPDF(params: CompanyAndInvoiceAmqpDto) {
    const invoice: InvoiceForZugferd = await this.invoicePrismaService.getInvoiceByIdForZugferd(params.invoiceId, params.companyId);
    const pdfFile: Uint8Array = await this.invoiceZugferdService.generatePdf(invoice);

    const fileName = `${this.config.getMinioConfig().invoicePrefix}${invoice.invoiceNumber}.pdf`;
    await this.s3Service.uploadPdf(Buffer.from(pdfFile.buffer), fileName);

    await this.invoicePrismaService.updateInvoiceURL(params.invoiceId, fileName);
    return fileName;
  }

  private async loadAssociatedDataAndConvertToDTO(invoices: InvoiceWithNFT[]): Promise<InvoiceAmqpDto[]> {
    const tradeReceivableDtos: InvoiceAmqpDto[] = [];

    for (const invoice of invoices) {
      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(
        invoice.tradeReceivable.id
      );

      tradeReceivableDtos.push(InvoiceAmqpDto.fromPrismaEntity(invoice, trStates, this.config.getMinioConfig().objectStorageURL));
    }
    return tradeReceivableDtos;
  }

  async createPaymentStatusForInvoice(statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    try {
      for (const statusChange of statusChanges) {
        const convertedDto = new InvoiceIdAndPaymentStateAmqpDto(statusChange.invoiceId, statusChange.paymentStatus);
        const relatedTradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.getTradeReceivableByInvoiceId(
          convertedDto.invoiceId
        );
        if (relatedTradeReceivable) {
          await this.tradeReceivablePrismaService.createPaymentState(
            convertedDto.toPrismaCreatePaymentStatusQuery(relatedTradeReceivable.id, new Date())
          );
          this.logger.debug('Updated PaymentState for invoice: ', convertedDto.invoiceId);
        } else {
          throw new NotFoundException(convertedDto.invoiceId);
        }
      }
      return true;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
