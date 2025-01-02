import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { PaymentStatus, Prisma, TradeReceivable } from '@prisma/client';
import { PaymentStatesEnum } from '../constants';
import { PrismaService } from '../prisma.service';
import { InvoiceCountAndDueMonth, InvoiceIdTypes, TradeReceivablePaymentStatusCount } from '../types';

@Injectable()
export class TradeReceivablePrismaService {
  private logger = new Logger(TradeReceivablePrismaService.name);
  constructor(private prismaService: PrismaService) {}

  async createTradeReceivable(data: Prisma.TradeReceivableCreateInput): Promise<TradeReceivable | null> {
    this.logger.verbose(`Insert new Trade Receivable ${data}`);
    try {
      return await this.prismaService.tradeReceivable.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getAll(): Promise<TradeReceivable[]> {
    this.logger.verbose('Returning all Trade Receivables ');
    return this.prismaService.tradeReceivable.findMany();
  }

  async getPaymentStatesForTradeReceivable(trId: string): Promise<PaymentStatus[]> {
    return this.prismaService.paymentStatus.findMany({
      where: { tradeReceivableId: trId },
    });
  }

  async getInvoiceIdsForPaidTradeReceivableIdsForMonth(month: string, year: number, creditorId: string): Promise<InvoiceIdTypes[]> {
    try {
      const comparableMonth = `${year}-${month}`;
      const invoiceIds = <InvoiceIdTypes[]>await this.prismaService.$queryRaw`
        SELECT DISTINCT iv."id"
        FROM "TradeReceivable" AS tr
        LEFT JOIN "PaymentStatus" AS ps ON tr."id" = ps."tradeReceivableId"
        LEFT JOIN "Invoice" AS iv ON tr."invoiceId" = iv."id"
        WHERE TO_CHAR(DATE_TRUNC('month', ps."timestamp"),'YYYY-MM') = ${comparableMonth}
         AND ps."status" = ${PaymentStatesEnum.PAID}
         AND iv."creditorId" = ${creditorId};
      `;

      return invoiceIds;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get trade receivable ids for ${year} ${month}`);
      throw e;
    }
  }

  async countPaidOnTimeInvoicesMonthly(year: number, creditorId: string): Promise<InvoiceCountAndDueMonth[]> {
    try {
      const invoiceIds = <InvoiceCountAndDueMonth[]>await this.prismaService.$queryRaw`
        SELECT COUNT(*) as invoice_count, TO_CHAR(DATE_TRUNC('month', iv."dueDate"), 'YYYY-MM') as due_month
        FROM "TradeReceivable" AS tr
        LEFT JOIN "PaymentStatus" AS ps ON tr."id" = ps."tradeReceivableId"
        LEFT JOIN "Invoice" AS iv ON tr."invoiceId" = iv."id"
        WHERE ps."timestamp" <= iv."dueDate"
        AND ps."status" = ${PaymentStatesEnum.PAID}
        AND iv."creditorId" = ${creditorId}
        GROUP BY due_month;
      `;

      return invoiceIds;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get trade receivable ids for ${year}`);
      throw e;
    }
  }

  async getTradeReceivableStateStatistics(creditorId: string): Promise<TradeReceivablePaymentStatusCount[]> {
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
              AND iv."creditorId" = ${creditorId}
         ) as trstat
      GROUP BY trstat."status";
    `;

      this.logger.verbose(`Trade receivable not paid statistics for creditor #${creditorId}: ${util.inspect(res)}`);
      return res;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getTradeReceivableByPaymentStatus(paymentStatus: string, creditorId: string): Promise<TradeReceivable[]> {
    try {
      const res = <TradeReceivable[]>await this.prismaService.$queryRaw`
      SELECT tr."id", tr."nft", tr."invoiceId"
      FROM "TradeReceivable" AS tr
      JOIN "PaymentStatus" AS ps ON tr."id" = ps."tradeReceivableId"
      LEFT JOIN "Invoice" AS iv ON tr."invoiceId" = iv."id"
      WHERE ps."status" = ${paymentStatus}
      AND iv."creditorId" = ${creditorId}
      AND ps."timestamp" =
        (
        SELECT MAX("timestamp")
        FROM "PaymentStatus" AS subps
        WHERE subps."tradeReceivableId" = tr."id"
        )
      GROUP BY tr."id";
    `;
      this.logger.debug('BY STATE' + util.inspect(res));
      return res;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
