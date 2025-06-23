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
    this.logger.debug(`Requesting Tradereceivables `);
    const params = new AllInvoicesFilterAmqpDto(paymentStates, creditorId, debtorId, invoiceNumber, dueDateFrom, dueDateTo, orderNumber);
    const response: InvoiceAmqpDto[] = await firstValueFrom<InvoiceAmqpDto[]>(
      this.processAMQPClient.send(InvoiceMessagePatterns.READ_ALL, params)
    );

    return await this.handleFrontendTradeReceivableDTOCreation(response);
  }

  async findOne(companyId: string, id: string): Promise<InvoiceDto> {
    try {
      this.logger.verbose('Requesting trade receivable ', id);
      const params = new CompanyAndInvoiceAmqpDto(companyId, id);
      const retVal = await firstValueFrom<InvoiceAmqpDto>(this.processAMQPClient.send(InvoiceMessagePatterns.READ_BY_ID, params));
      return (await this.handleFrontendTradeReceivableDTOCreation([retVal]))[0];
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

  private async handleFrontendTradeReceivableDTOCreation(tradeReceivables: InvoiceAmqpDto[]): Promise<InvoiceDto[]> {
    const retVal: InvoiceDto[] = [];
    const companies: Map<string, CompanyAmqpDto> = new Map();
    for (const tr of tradeReceivables) {
      if (!companies.has(tr.creditorId)) {
        companies.set(tr.creditorId, await this.companyService.findOne(tr.creditorId));
      }
      if (!companies.has(tr.debtorId)) {
        companies.set(tr.debtorId, await this.companyService.findOne(tr.debtorId));
      }

      retVal.push(InvoiceDto.toTradeReceivableDto(tr, companies.get(tr.creditorId).name, companies.get(tr.debtorId).name));
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
    const tradeReceivableDtos: PaidStatisticsDto[] = [];
    const tradeReceivableAmqpDtos: PaidStatisticsAmqpDto[] = await firstValueFrom<PaidStatisticsAmqpDto[]>(
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
    for (const amqpTr of tradeReceivableAmqpDtos) {
      tradeReceivableDtos.push(PaidStatisticsDto.toPaidStatisticsDto(amqpTr));
    }
    return tradeReceivableDtos;
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
