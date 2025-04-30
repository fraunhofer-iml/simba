/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import { PaymentStates } from '@ap3/util';
import { Injectable, Logger } from '@nestjs/common';
import { PaymentStatus, Prisma, TradeReceivable } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { QueryBuilderHelperService } from '../../util/query-builder-helper.service';
import { InvoiceCountAndDueMonth, InvoiceIdTypes } from '../invoice';
import { TradeReceivablePaymentStatusCount } from './types';

@Injectable()
export class TradeReceivablePrismaService {
  private logger = new Logger(TradeReceivablePrismaService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly queryBuilderService: QueryBuilderHelperService
  ) {}

  async createTradeReceivable(data: Prisma.TradeReceivableCreateInput): Promise<TradeReceivable | null> {
    this.logger.verbose(`Insert new Trade Receivable ${data}`);
    try {
      return await this.prismaService.tradeReceivable.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async createPaymentState(data: Prisma.PaymentStatusCreateInput) {
    this.logger.verbose(`Insert new PaymentState for Receivable ${data}`);
    try {
      return await this.prismaService.paymentStatus.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getPaymentStatesForTradeReceivable(trId: string): Promise<PaymentStatus[]> {
    return this.prismaService.paymentStatus.findMany({
      where: { tradeReceivableId: trId },
    });
  }

  async getInvoiceIdsForPaidTradeReceivableIdsForMonthByFinancialRole(
    invoiceIds: string[],
    financialRole: string,
    month: string,
    year: number,
    companyId: string
  ) {
    const financialRoleQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFinancialRole(financialRole, companyId);
    const iDsFromFilteringQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFilteredInvoiceIds(invoiceIds);
    return this.getInvoiceIdsForPaidTradeReceivableIdsForMonth(month, year, financialRoleQuery, iDsFromFilteringQuery);
  }

  private async getInvoiceIdsForPaidTradeReceivableIdsForMonth(
    month: string,
    year: number,
    financialRoleQuery: Prisma.Sql,
    iDsFromFilteringQuery: Prisma.Sql
  ): Promise<InvoiceIdTypes[]> {
    try {
      const comparableMonth = `${year}-${month}`;
      return <InvoiceIdTypes[]>await this.prismaService.$queryRaw`
        SELECT DISTINCT iv."id"
        FROM "TradeReceivable" AS tr
        LEFT JOIN "PaymentStatus" AS ps ON tr."id" = ps."tradeReceivableId"
        LEFT JOIN "Invoice" AS iv ON tr."invoiceId" = iv."id"
        WHERE TO_CHAR(DATE_TRUNC('month', ps."timestamp"),'YYYY-MM') = ${comparableMonth}
         AND ps."status" = ${PaymentStates.PAID}
         AND ${financialRoleQuery}
         AND ${iDsFromFilteringQuery};
      `;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get trade receivable ids for ${year} ${month}`);
      throw e;
    }
  }

  async countPaidOnTimeInvoicesMonthlyByFinancialRole(
    filteredInvoiceIds: string[],
    financialRole: string,
    year: number,
    companyId: string
  ) {
    const financialQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFinancialRole(financialRole, companyId);
    const filteredInvoiceQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFilteredInvoiceIds(filteredInvoiceIds);
    return this.countPaidOnTimeInvoicesMonthly(year, financialQuery, filteredInvoiceQuery);
  }

  private async countPaidOnTimeInvoicesMonthly(
    year: number,
    financialRoleQuery: Prisma.Sql,
    filteredInvoiceQuery: Prisma.Sql
  ): Promise<InvoiceCountAndDueMonth[]> {
    try {
      return <InvoiceCountAndDueMonth[]>await this.prismaService.$queryRaw`
        SELECT COUNT(*) as invoice_count, TO_CHAR(DATE_TRUNC('month', iv."dueDate"), 'YYYY-MM') as due_month
        FROM "TradeReceivable" AS tr
        LEFT JOIN "PaymentStatus" AS ps ON tr."id" = ps."tradeReceivableId"
        LEFT JOIN "Invoice" AS iv ON tr."invoiceId" = iv."id"
        WHERE ps."timestamp" <= iv."dueDate"
        AND ps."status" = ${PaymentStates.PAID}
        AND ${financialRoleQuery}
        AND ${filteredInvoiceQuery}
        GROUP BY due_month;
      `;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get trade receivable ids for ${year}`);
      throw e;
    }
  }

  async getTradeReceivableStateStatisticsByFinancialRole(
    filteredInvoiceIds: string[],
    financialRole: string,
    companyId: string
  ): Promise<TradeReceivablePaymentStatusCount[]> {
    const financialQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFinancialRole(financialRole, companyId);
    const filteredInvoiceQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFilteredInvoiceIds(filteredInvoiceIds);
    return this.getTradeReceivableStateStatistics(financialQuery, filteredInvoiceQuery);
  }

  private async getTradeReceivableStateStatistics(
    financialQuery: Prisma.Sql,
    filteredInvoiceQuery: Prisma.Sql
  ): Promise<TradeReceivablePaymentStatusCount[]> {
    try {
      const res = <TradeReceivablePaymentStatusCount[]>await this.prismaService.$queryRaw`
      SELECT trstat."status", COUNT(*) as count, SUM(trstat."totalAmountWithoutVat") as total_value
      FROM (
        SELECT tr."id", ps."status", ps."timestamp", iv."totalAmountWithoutVat"
        FROM "TradeReceivable" AS tr
        LEFT JOIN "PaymentStatus" AS ps ON ps."tradeReceivableId" = tr."id"
        LEFT JOIN "Invoice" AS iv ON tr."invoiceId" = iv."id"
        WHERE ps."timestamp" = (
                SELECT MAX("timestamp")
                FROM "PaymentStatus" AS subps
                WHERE subps."tradeReceivableId" = tr."id"
              )
              AND ${financialQuery}
              AND ${filteredInvoiceQuery}
         ) as trstat
      GROUP BY trstat."status";
    `;

      this.logger.verbose(`Trade receivable not paid statistics for query #${financialQuery}: ${util.inspect(res)}`);
      return res;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  private getInvoiceFilterClause(
    paymentStates: PaymentStates[],
    creditorId: string,
    debtorId: string,
    invoiceNumber: string,
    dueDateFrom: Date,
    dueDateTo: Date
  ): Prisma.Sql {
    let companyWhere: Prisma.Sql = Prisma.sql`true`;

    if (paymentStates?.length > 0) {
      let paymentStateWhere: Prisma.Sql = Prisma.sql``;

      paymentStates.forEach((paymentState: string, index: number) => {
        paymentStateWhere =
          index == 0
            ? Prisma.sql`${paymentStateWhere} ps."status" = ${paymentState}`
            : Prisma.sql`${paymentStateWhere} OR ps."status" = ${paymentState}`;
      });

      companyWhere = Prisma.sql`${companyWhere} AND (${paymentStateWhere})`;
    }

    if (creditorId && debtorId && creditorId === debtorId) {
      companyWhere = Prisma.sql`${companyWhere} AND (iv."creditorId" = ${creditorId} OR iv."debtorId" = ${debtorId})`;
    } else {
      if (creditorId) companyWhere = Prisma.sql`${companyWhere} AND iv."creditorId" = ${creditorId}`;
      if (debtorId) companyWhere = Prisma.sql`${companyWhere} AND iv."debtorId" = ${debtorId}`;
    }

    if (invoiceNumber) {
      companyWhere = Prisma.sql`${companyWhere} AND iv."invoiceNumber" = ${invoiceNumber}`;
    }
    if (dueDateFrom) {
      dueDateTo = dueDateTo ? dueDateTo : dueDateFrom;
      const lowerLimit = new Date(dueDateFrom);
      const upperLimit = new Date(dueDateTo);
      lowerLimit.setHours(0, 0, 0, 0);
      upperLimit.setHours(23, 59, 59, 999);
      companyWhere = Prisma.sql`${companyWhere} AND iv."dueDate" < ${upperLimit} AND iv."dueDate" > ${lowerLimit}`;
    }
    return companyWhere;
  }

  async getTradeReceivablesForFilterParams(
    paymentStates: PaymentStates[],
    creditorId: string,
    debtorId: string,
    invoiceNumber: string,
    dueDateFrom: Date,
    dueDateTo: Date
  ): Promise<TradeReceivable[]> {
    const filterWhereClause: Prisma.Sql = this.getInvoiceFilterClause(
      paymentStates,
      creditorId,
      debtorId,
      invoiceNumber,
      dueDateFrom,
      dueDateTo
    );

    try {
      const res = <TradeReceivable[]>await this.prismaService.$queryRaw`
      SELECT tr."id", tr."nft", tr."invoiceId"
      FROM "TradeReceivable" AS tr
      JOIN "PaymentStatus" AS ps ON tr."id" = ps."tradeReceivableId"
      LEFT JOIN "Invoice" AS iv ON tr."invoiceId" = iv."id"
      WHERE ${filterWhereClause}
      AND ps."timestamp" =
        (
        SELECT MAX("timestamp")
        FROM "PaymentStatus" AS subps
        WHERE subps."tradeReceivableId" = tr."id"
        )
      GROUP BY tr."id";
    `;
      return res;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getTradeReceivableByInvoiceId(id: string): Promise<TradeReceivable | null> {
    return this.prismaService.tradeReceivable.findUnique({ where: { invoiceId: id } });
  }
}
