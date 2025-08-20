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
import { Invoice, PaymentStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { QueryBuilderHelperService } from '../../util/query-builder-helper.service';
import {
  InvoiceCountAndDueMonth,
  InvoiceForZugferd,
  InvoiceIdTypes,
  InvoiceSumTotalAmountWithoutVatTypes,
  InvoiceWithOrderBuyerRef,
} from './types';
import { InvoicePaymentStatusCount } from './types/invoice-payment-status';

@Injectable()
export class InvoicePrismaService {
  private logger = new Logger(InvoicePrismaService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly queryBuilderService: QueryBuilderHelperService
  ) {}

  async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice | null> {
    this.logger.verbose(`Insert new invoice ${util.inspect(data)}`);
    try {
      return this.prismaService.invoice.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async updateInvoice(invoiceId: string, data: Prisma.InvoiceUpdateInput) {
    try {
      await this.prismaService.invoice.update({ where: { id: invoiceId }, data: data });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getInvoiceByIdForZugferd(id: string, companyId: string): Promise<InvoiceForZugferd> {
    try {
      const companyFilter: Prisma.InvoiceWhereInput[] = companyId
        ? [{ creditorId: String(companyId) }, { debtorId: String(companyId) }]
        : [];

      return this.prismaService.invoice.findUniqueOrThrow({
        where: {
          id: id,
          ...(companyFilter.length ? { OR: companyFilter } : {}),
        },
        include: {
          serviceProcess: {
            include: {
              order: {
                include: {
                  orderLines: {
                    include: {
                      item: true,
                    },
                  },
                },
              },
              machineAssignments: {
                include: {
                  machine: true,
                },
              },
            },
          },
          debtor: {
            include: {
              paymentInformation: true,
            },
          },
          creditor: {
            include: {
              paymentInformation: true,
            },
          },
        },
      });
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }

  async getInvoiceByServiceProcessId(serviceProcessId: string): Promise<Invoice[]> {
    return this.prismaService.invoice.findMany({
      where: {
        serviceProcessId: serviceProcessId,
      },
    });
  }

  async getInvoices({
    creditorId,
    debtorId,
    orderId,
    invoiceIds,
    paymentStates,
    invoiceNumbers,
    orderNumber,
    dueDateFrom,
    dueDateTo,
  }: {
    creditorId?: string;
    debtorId?: string;
    orderId?: string;
    invoiceIds?: string[];
    paymentStates?: string[];
    invoiceNumbers?: string[];
    orderNumber?: string[];
    dueDateFrom?: Date;
    dueDateTo?: Date;
  }): Promise<InvoiceWithOrderBuyerRef[]> {
    this.logger.verbose('Return all invoices from database');
    try {
      const andFilters: Prisma.InvoiceWhereInput[] = this.createInvoiceWhereAndFilter(
        invoiceIds,
        invoiceNumbers,
        orderId,
        orderNumber,
        paymentStates,
        dueDateFrom,
        dueDateTo
      );
      let orFilters: Prisma.InvoiceWhereInput[] = [];

      const creditorFilter: Prisma.InvoiceWhereInput | undefined = creditorId ? { creditorId: String(creditorId) } : undefined;
      const debtorFilter: Prisma.InvoiceWhereInput | undefined = debtorId ? { debtorId: String(debtorId) } : undefined;

      if (creditorFilter && debtorFilter && creditorId == debtorId) {
        orFilters = [creditorFilter, debtorFilter];
      } else {
        if (creditorFilter) andFilters.push(creditorFilter);
        if (debtorFilter) andFilters.push(debtorFilter);
      }

      const where: Prisma.InvoiceWhereInput = {
        ...(orFilters.length ? { OR: orFilters } : {}),
        ...(andFilters.length ? { AND: andFilters } : {}),
      };

      return <InvoiceWithOrderBuyerRef[]>await this.prismaService.invoice.findMany({
        where: where,
        include: {
          serviceProcess: {
            include: {
              order: {
                select: {
                  id: true,
                  buyerOrderRefDocumentId: true,
                },
              },
            },
          },
        },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  private createInvoiceWhereAndFilter(
    invoiceIds?: string[],
    invoiceNumbers?: string[],
    orderId?: string,
    orderNumbers?: string[],
    paymentStates?: string[],
    dueDateFrom?: Date,
    dueDateTo?: Date
  ): Prisma.InvoiceWhereInput[] {
    const orderFilter: Prisma.InvoiceWhereInput | undefined = orderId ? { serviceProcess: { orderId: String(orderId) } } : undefined;

    const paymentStateFilter: Prisma.InvoiceWhereInput | undefined =
      paymentStates && paymentStates.length > 0 ? { states: { some: { status: { in: paymentStates } } } } : undefined;
    const orderNumbersFilter: Prisma.InvoiceWhereInput | undefined =
      orderNumbers && orderNumbers.length > 0
        ? { serviceProcess: { order: { buyerOrderRefDocumentId: { in: orderNumbers } } } }
        : undefined;
    const invoiceIdsFilter: Prisma.InvoiceWhereInput | undefined =
      invoiceIds && invoiceIds.length > 0 ? { id: { in: invoiceIds } } : undefined;
    const invoiceNumbersFilter: Prisma.InvoiceWhereInput | undefined =
      invoiceNumbers && invoiceNumbers.length > 0 ? { invoiceNumber: { in: invoiceNumbers } } : undefined;
    const dateRangeFilter: Prisma.InvoiceWhereInput | undefined =
      dueDateFrom && dueDateTo ? { creationDate: { gte: dueDateFrom, lt: dueDateTo } } : undefined;

    return <Prisma.InvoiceWhereInput[]>(
      [orderFilter, orderNumbersFilter, invoiceIdsFilter, paymentStateFilter, invoiceNumbersFilter, dateRangeFilter].filter(
        (filter) => filter !== undefined
      )
    );
  }

  async countInvoicesDueInMonth(
    year: number,
    financialQuery: Prisma.Sql,
    filteredInvoiceQuery: Prisma.Sql
  ): Promise<InvoiceCountAndDueMonth[]> {
    try {
      return <InvoiceCountAndDueMonth[]>await this.prismaService.$queryRaw`
        SELECT COUNT(*) as invoice_count, TO_CHAR(DATE_TRUNC('month', iv."dueDate"), 'YYYY-MM') as due_month
        FROM "Invoice" AS iv
        where ${financialQuery}
        AND ${filteredInvoiceQuery}
        GROUP BY due_month;
      `;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get Invoice ids for ${year}`);
      throw e;
    }
  }

  async sumInvoiceAmounts({
    invoiceIds,
    creditorId,
    debtorId,
  }: {
    invoiceIds: string[];
    creditorId?: string;
    debtorId?: string;
  }): Promise<InvoiceSumTotalAmountWithoutVatTypes> {
    const invoiceFilter: Prisma.InvoiceWhereInput | undefined =
      invoiceIds && invoiceIds.length > 0 ? { id: { in: invoiceIds } } : undefined;
    const creditorFilter: Prisma.InvoiceWhereInput | undefined = creditorId ? { creditorId: String(creditorId) } : undefined;
    const debtorFilter: Prisma.InvoiceWhereInput | undefined = debtorId ? { debtorId: String(debtorId) } : undefined;
    const andFilters = [invoiceFilter, creditorFilter, debtorFilter].filter((filter) => filter !== undefined);

    const where: Prisma.InvoiceWhereInput = {
      ...(andFilters.length ? { AND: andFilters } : {}),
    };

    const totalSum = <InvoiceSumTotalAmountWithoutVatTypes>await this.prismaService.invoice.aggregate({
      _sum: {
        totalAmountWithoutVat: true,
      },
      where: where,
    });
    this.logger.verbose(util.inspect(`Total amount without vat: ${util.inspect(totalSum)}`));
    return totalSum;
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

  async getPaymentStatesForInvoice(ivId: string): Promise<PaymentStatus[]> {
    return this.prismaService.paymentStatus.findMany({
      where: { invoiceId: ivId },
    });
  }

  async getIdsForPaidInvoicesForMonthByFinancialRole(
    invoiceIds: string[],
    financialRole: string,
    month: string,
    year: number,
    companyId: string
  ) {
    const financialRoleQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFinancialRole(financialRole, companyId);
    const iDsFromFilteringQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFilteredInvoiceIds(invoiceIds);
    return this.getPaidInvoiceIdsForMonth(month, year, financialRoleQuery, iDsFromFilteringQuery);
  }

  private async getPaidInvoiceIdsForMonth(
    month: string,
    year: number,
    financialRoleQuery: Prisma.Sql,
    iDsFromFilteringQuery: Prisma.Sql
  ): Promise<InvoiceIdTypes[]> {
    try {
      const comparableMonth = `${year}-${month}`;
      return <InvoiceIdTypes[]>await this.prismaService.$queryRaw`
        SELECT DISTINCT iv."id"
        FROM "Invoice" AS iv
        LEFT JOIN "PaymentStatus" AS ps ON iv."id" = ps."invoiceId"
        WHERE TO_CHAR(DATE_TRUNC('month', ps."timestamp"),'YYYY-MM') = ${comparableMonth}
         AND ps."status" = ${PaymentStates.PAID}
         AND ${financialRoleQuery}
         AND ${iDsFromFilteringQuery};
      `;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get invoice ids for ${year} ${month}`);
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
        FROM "Invoice" AS iv
        LEFT JOIN "PaymentStatus" AS ps ON iv."id" = ps."invoiceId"
        WHERE ps."timestamp" <= iv."dueDate"
        AND ps."status" = ${PaymentStates.PAID}
        AND ${financialRoleQuery}
        AND ${filteredInvoiceQuery}
        GROUP BY due_month;
      `;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get invoice ids for ${year}`);
      throw e;
    }
  }

  async getInvoiceStateStatisticsByFinancialRole(
    filteredInvoiceIds: string[],
    financialRole: string,
    companyId: string
  ): Promise<InvoicePaymentStatusCount[]> {
    const financialQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFinancialRole(financialRole, companyId);
    const filteredInvoiceQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFilteredInvoiceIds(filteredInvoiceIds);
    return this.getInvoiceStateStatistics(financialQuery, filteredInvoiceQuery);
  }

  private async getInvoiceStateStatistics(
    financialQuery: Prisma.Sql,
    filteredInvoiceQuery: Prisma.Sql
  ): Promise<InvoicePaymentStatusCount[]> {
    try {
      const res = <InvoicePaymentStatusCount[]>await this.prismaService.$queryRaw`
      SELECT ivstat."status", COUNT(*) as count, SUM(ivstat."totalAmountWithoutVat") as total_value
      FROM (
        SELECT iv."id", ps."status", ps."timestamp", iv."totalAmountWithoutVat"
        FROM "Invoice" AS iv
        LEFT JOIN "PaymentStatus" AS ps ON ps."invoiceId" = iv."id"
        WHERE ps."timestamp" = (
                SELECT MAX("timestamp")
                FROM "PaymentStatus" AS subps
                WHERE subps."invoiceId" = iv."id"
              )
              AND ${financialQuery}
              AND ${filteredInvoiceQuery}
         ) as ivstat
      GROUP BY ivstat."status";
    `;

      this.logger.verbose(` Unpaid Invoice statistics for query #${financialQuery}: ${util.inspect(res)}`);
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

  async getInvoicesForFilterParams(
    paymentStates: PaymentStates[],
    creditorId: string,
    debtorId: string,
    invoiceNumber: string,
    dueDateFrom: Date,
    dueDateTo: Date
  ): Promise<Invoice[]> {
    const filterWhereClause: Prisma.Sql = this.getInvoiceFilterClause(
      paymentStates,
      creditorId,
      debtorId,
      invoiceNumber,
      dueDateFrom,
      dueDateTo
    );

    try {
      const res = <Invoice[]>await this.prismaService.$queryRaw`
      SELECT iv.*
      FROM "Invoice" AS iv
      JOIN "PaymentStatus" AS ps ON iv."id" = ps."invoiceId"
      WHERE ${filterWhereClause}
      AND ps."timestamp" =
        (
        SELECT MAX("timestamp")
        FROM "PaymentStatus" AS subps
        WHERE subps."invoiceId" = iv."id"
        )
      GROUP BY iv."id";
    `;
      return res;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
