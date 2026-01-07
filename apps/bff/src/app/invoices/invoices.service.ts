/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AllInvoicesFilterAmqpDto,
  AmqpBrokerQueues,
  CompanyAmqpDto,
  CompanyAndFinancialRole,
  CompanyAndInvoiceAmqpDto,
  InvoiceAmqpDto,
  InvoiceIdAndPaymentStateAmqpDto,
  InvoiceMessagePatterns,
  NotPaidStatisticsAmqpDto,
  PaidStatisticsAmqpDto,
  TRParamsCompanyIdAndYearAndFinancialRole,
} from '@ap3/amqp';
import { CreateInvoiceDto, InvoiceDto, InvoiceIdAndPaymentStateDto, PaidStatisticsDto, UnpaidStatisticsDto } from '@ap3/api';
import { FinancialRoles, PaymentStates } from '@ap3/util';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy,
    private readonly companyService: CompaniesService
  ) {}

  async findAllWithFilter(
    orderNumber?: string[],
    paymentStates?: PaymentStates[],
    creditorId?: string,
    debtorId?: string,
    invoiceNumber?: string,
    dueDateFrom?: Date,
    dueDateTo?: Date
  ): Promise<InvoiceDto[]> {
    this.logger.debug(`Requesting Invoices `);
    const params = new AllInvoicesFilterAmqpDto(paymentStates, creditorId, debtorId, invoiceNumber, dueDateFrom, dueDateTo, orderNumber);
    const response: InvoiceAmqpDto[] = await firstValueFrom<InvoiceAmqpDto[]>(
      this.processAMQPClient.send(InvoiceMessagePatterns.READ_ALL, params)
    );
    return await this.handleFrontendInvoiceDTOCreation(response);
  }

  async findOne(companyId: string, id: string): Promise<InvoiceDto> {
    try {
      this.logger.verbose('Requesting invoice ', id);
      const params = new CompanyAndInvoiceAmqpDto(companyId, id);
      const retVal = await firstValueFrom<InvoiceAmqpDto>(this.processAMQPClient.send(InvoiceMessagePatterns.READ_BY_ID, params));
      return (await this.handleFrontendInvoiceDTOCreation([retVal]))[0];
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }

  async createAndUploadZugferdPDF(companyId: string, id: string): Promise<string> {
    try {
      this.logger.verbose('Requesting zugferd pdf creation for invoice ', id);
      const params = new CompanyAndInvoiceAmqpDto(companyId, id);
      return await firstValueFrom<string>(this.processAMQPClient.send(InvoiceMessagePatterns.CREATE_AND_UPLOAD_ZUGFERD_PDF, params));
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }

  private async handleFrontendInvoiceDTOCreation(invoices: InvoiceAmqpDto[]): Promise<InvoiceDto[]> {
    const retVal: InvoiceDto[] = [];
    const companies: Map<string, CompanyAmqpDto> = new Map();
    for (const iv of invoices) {
      if (!companies.has(iv.creditorId)) {
        companies.set(iv.creditorId, await this.companyService.findOne(iv.creditorId));
      }
      if (!companies.has(iv.debtorId)) {
        companies.set(iv.debtorId, await this.companyService.findOne(iv.debtorId));
      }

      retVal.push(InvoiceDto.toInvoiceDto(iv, companies.get(iv.creditorId).name, companies.get(iv.debtorId).name));
    }
    return retVal;
  }

  async getStatisticNotPaidPerMonth(companyId: string, financialRole: FinancialRoles, invoiceIds?: string): Promise<UnpaidStatisticsDto> {
    const params = new CompanyAndFinancialRole(invoiceIds ? this.parseJSONStringtoArray(invoiceIds) : [], companyId, financialRole);

    const notPaidTRStatistics: NotPaidStatisticsAmqpDto = await firstValueFrom<NotPaidStatisticsAmqpDto>(
      this.processAMQPClient.send(InvoiceMessagePatterns.READ_STATISTICS_NOT_PAID, params)
    );

    return UnpaidStatisticsDto.toUnpaidStatisticsDto(notPaidTRStatistics);
  }

  async getStatisticPaidPerMonth(
    companyId: string,
    year: number,
    financialRole: FinancialRoles,
    invoiceIds?: string
  ): Promise<PaidStatisticsDto[]> {
    const invoiceDtos: PaidStatisticsDto[] = [];
    const invoiceAmqpDtos: PaidStatisticsAmqpDto[] = await firstValueFrom<PaidStatisticsAmqpDto[]>(
      this.processAMQPClient
        .send(
          InvoiceMessagePatterns.READ_STATISTICS_PAID,
          new TRParamsCompanyIdAndYearAndFinancialRole(
            invoiceIds ? this.parseJSONStringtoArray(invoiceIds) : [],
            companyId,
            year,
            financialRole
          )
        )
        .pipe(defaultIfEmpty(null))
    );
    for (const amqpIv of invoiceAmqpDtos) {
      invoiceDtos.push(PaidStatisticsDto.toPaidStatisticsDto(amqpIv));
    }
    return invoiceDtos;
  }

  async createNewPaymentStatusForInvoice(statusChanges: InvoiceIdAndPaymentStateDto[]): Promise<void> {
    try {
      const amqpChanges: InvoiceIdAndPaymentStateAmqpDto[] = statusChanges.map((statusChange: InvoiceIdAndPaymentStateDto) => {
        const convertedDto = new InvoiceIdAndPaymentStateDto(statusChange.invoiceId, statusChange.paymentStatus);
        return convertedDto.toAMQPDto();
      });

      await firstValueFrom(this.processAMQPClient.send(InvoiceMessagePatterns.CREATE_NEW_PAYMENT_STATUS_FOR_INVOICE, amqpChanges));
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }

  createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceAmqpDto> {
    try {
      return firstValueFrom(this.processAMQPClient.send(InvoiceMessagePatterns.CREATE, createInvoiceDto));
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }

  private parseJSONStringtoArray(arrayString: string) {
    let result = [];
    try {
      result = JSON.parse(arrayString);
      return result;
    } catch (e) {
      this.logger.error('Error parsing a JSON string to an array. The string is : ', arrayString);
      return e;
    }
  }
}
