import * as util from 'node:util';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { InvoiceCountAndDueMonth, InvoiceSumTotalAmountWithoutVatTypes } from '../types';

@Injectable()
export class InvoicePrismaService {
  private logger = new Logger(InvoicePrismaService.name);

  constructor(private prismaService: PrismaService) {}

  async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice | null> {
    this.logger.verbose(`Insert new invoice ${util.inspect(data)}`);
    try {
      return await this.prismaService.invoice.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getInvoices(): Promise<Invoice[]> {
    this.logger.verbose('Return all invoices from database');
    try {
      return await this.prismaService.invoice.findMany();
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getInvoiceById(id: string): Promise<Invoice> {
    this.logger.verbose('Return invoice by id from database');
    try {
      const invoice = await this.prismaService.invoice.findUnique({
        where: { id: id },
      });
      if (!invoice) {
        throw new NotFoundException(`Invoice with id ${id} was not found in database.`);
      }
      return invoice;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async countInvoicesDueInMonth(year: number, creditorId: string): Promise<InvoiceCountAndDueMonth[]> {
    try {
      const invoiceCount = <InvoiceCountAndDueMonth[]>await this.prismaService.$queryRaw`
        SELECT COUNT(*) as invoice_count, TO_CHAR(DATE_TRUNC('month', iv."dueDate"), 'YYYY-MM') as due_month
        FROM "Invoice" AS iv
        where iv."creditorId" = ${creditorId}
        GROUP BY due_month;
      `;

      return invoiceCount;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get trade receivable ids for ${year}`);
      throw e;
    }
  }

  async sumInvoiceAmountsForTradeReceivables(invoiceIds: string[], creditorId: string): Promise<InvoiceSumTotalAmountWithoutVatTypes> {
    const totalSum = <InvoiceSumTotalAmountWithoutVatTypes>await this.prismaService.invoice.aggregate({
      _sum: {
        totalAmountWithoutVat: true,
      },
      where: {
        id: {
          in: invoiceIds,
        },
        creditorId: creditorId,
      },
    });
    this.logger.debug(util.inspect(totalSum));
    return totalSum;
  }
}
