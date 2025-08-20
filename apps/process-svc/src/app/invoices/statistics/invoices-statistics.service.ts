/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import { NotPaidStatisticsAmqpDto, PaidStatisticsAmqpDto } from '@ap3/amqp';
import {
  InvoiceCountAndDueMonth,
  InvoiceDatabaseAdapterService,
  InvoiceIdTypes,
  InvoicePaymentStatusCount,
  InvoiceSumTotalAmountWithoutVatTypes,
} from '@ap3/database';
import { MonthsEnum, PaymentStates } from '@ap3/util';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InvoicesStatisticsService {
  private readonly logger = new Logger(InvoicesStatisticsService.name);
  constructor(private readonly invoiceAdapterService: InvoiceDatabaseAdapterService) {}

  async calcPaidInvoicesVolumePerMonth(
    invoiceIds: string[],
    year: number,
    companyId: string,
    financialRole: string
  ): Promise<PaidStatisticsAmqpDto[]> {
    this.logger.debug(`Paid per month for ${companyId} in ${year} and ${financialRole}`);
    const volumeOfPaidInvoicesPerMonth: PaidStatisticsAmqpDto[] = [];
    const paidInvoiceIdsPerMonth: Map<string, string[]> = await this.getPaidInvoiceIdsPerMonth(invoiceIds, year, companyId, financialRole);
    const dueInvoicesCountPerMonth: Map<string, number> = await this.getCountOfInvoicesDuePerMonth(
      invoiceIds,
      year,
      companyId,
      financialRole
    );
    const paidOnTimeInvoicesCountPerMonth: Map<string, number> = await this.getCountOfPaidOnTimeInvoicesPerMonth(
      invoiceIds,
      year,
      companyId,
      financialRole
    );

    for (const key of paidInvoiceIdsPerMonth.keys()) {
      let totalAmount = 0;
      if (paidInvoiceIdsPerMonth.has(key) && paidInvoiceIdsPerMonth.get(key).length > 0) {
        const totalAmountOfPaidTRs: InvoiceSumTotalAmountWithoutVatTypes =
          await this.invoiceAdapterService.sumInvoiceAmountsByFinancialRole(financialRole, paidInvoiceIdsPerMonth.get(key), companyId);
        totalAmount = +totalAmountOfPaidTRs._sum.totalAmountWithoutVat;
      }

      let percentageOfPaidOnTimeTRs = 0;
      if (dueInvoicesCountPerMonth.has(key) && dueInvoicesCountPerMonth.get(key) != 0 && paidOnTimeInvoicesCountPerMonth.has(key)) {
        percentageOfPaidOnTimeTRs = Number(paidOnTimeInvoicesCountPerMonth.get(key)) / Number(dueInvoicesCountPerMonth.get(key));
      }

      volumeOfPaidInvoicesPerMonth.push(new PaidStatisticsAmqpDto(key, totalAmount, percentageOfPaidOnTimeTRs));
    }
    return volumeOfPaidInvoicesPerMonth;
  }

  async getInvoicesNotPaidStatisticsByCompanyId(
    filteredInvoiceIds: string[],
    companyId: string,
    financialRole: string
  ): Promise<NotPaidStatisticsAmqpDto> {
    let overdue = 0;
    let overdueValue = 0;
    let outstanding = 0;
    let outstandingValue = 0;

    const invoicePaymentStatesCount: InvoicePaymentStatusCount[] =
      await this.invoiceAdapterService.getInvoiceStateStatisticsByFinancialRole(filteredInvoiceIds, financialRole, companyId);
    for (const trPaymentStateCount of invoicePaymentStatesCount) {
      if (trPaymentStateCount.status == PaymentStates.OPEN) {
        outstanding = Number(trPaymentStateCount.count);
        outstandingValue = Number(trPaymentStateCount.total_value);
      } else if (trPaymentStateCount.status == PaymentStates.EXCEEDED) {
        overdue = Number(trPaymentStateCount.count);
        overdueValue = Number(trPaymentStateCount.total_value);
      }
    }

    return new NotPaidStatisticsAmqpDto(overdue, overdueValue, outstanding, outstandingValue);
  }

  private async getPaidInvoiceIdsPerMonth(
    invoiceIdsFromFilter: string[],
    year: number,
    companyId: string,
    financialRole: string
  ): Promise<Map<string, string[]>> {
    const paidInvoiceIdsPerMonth: Map<string, string[]> = new Map();
    for (const month in MonthsEnum) {
      const monthIndex = MonthsEnum[month as keyof typeof MonthsEnum];
      const invoiceIds: InvoiceIdTypes[] = await this.invoiceAdapterService.getPaidInvoiceIdsForMonthByFinancialRole(
        invoiceIdsFromFilter,
        financialRole,
        monthIndex,
        year,
        companyId
      );
      const invoiceIdsAsString: string[] = [];

      invoiceIds.forEach((ivId) => {
        invoiceIdsAsString.push(ivId.id);
      });

      const dueMonthSQL = `${year}-${monthIndex}`;
      paidInvoiceIdsPerMonth.set(dueMonthSQL, invoiceIdsAsString);
    }
    return paidInvoiceIdsPerMonth;
  }

  private async getCountOfInvoicesDuePerMonth(
    filteredInvoiceIds: string[],
    year: number,
    companyId: string,
    financialRole: string
  ): Promise<Map<string, number>> {
    const dueInvoicesPerMonth: Map<string, number> = new Map();
    const dueInvoicesForMonth: InvoiceCountAndDueMonth[] = await this.invoiceAdapterService.countInvoicesDueInMonthByFinancialRole(
      filteredInvoiceIds,
      financialRole,
      year,
      companyId
    );

    this.logger.debug(util.inspect(dueInvoicesForMonth));
    if (dueInvoicesForMonth && dueInvoicesForMonth.length > 0) {
      for (const invoiceCount of dueInvoicesForMonth) {
        dueInvoicesPerMonth.set(invoiceCount.due_month, invoiceCount.invoice_count);
        this.logger.debug(util.inspect(dueInvoicesPerMonth));
      }
    }
    return dueInvoicesPerMonth;
  }

  private async getCountOfPaidOnTimeInvoicesPerMonth(
    filteredInvoiceIds: string[],
    year: number,
    companyId: string,
    financialRole: string
  ): Promise<Map<string, number>> {
    const countPaidOnTimeInvoicesPerMonth: Map<string, number> = new Map();
    const paidOnTimeInvoicesPerMonth: InvoiceCountAndDueMonth[] =
      await this.invoiceAdapterService.countPaidOnTimeInvoicesMonthlyByFinancialRole(filteredInvoiceIds, financialRole, year, companyId);

    this.logger.debug(util.inspect(paidOnTimeInvoicesPerMonth));
    if (paidOnTimeInvoicesPerMonth && paidOnTimeInvoicesPerMonth.length > 0) {
      for (const paidInvoiceCount of paidOnTimeInvoicesPerMonth) {
        countPaidOnTimeInvoicesPerMonth.set(paidInvoiceCount.due_month, paidInvoiceCount.invoice_count);
        this.logger.debug(util.inspect(countPaidOnTimeInvoicesPerMonth));
      }
    }
    return countPaidOnTimeInvoicesPerMonth;
  }
}
