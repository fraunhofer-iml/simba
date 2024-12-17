import * as util from 'node:util';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { InvoiceCountAndDueMonth, InvoiceSumTotalAmountWithoutVatTypes, InvoiceWithNFT } from '../types';

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

  async getInvoiceById(id: string, companyId: string): Promise<InvoiceWithNFT> {
    this.logger.verbose('Return invoice by id from database');
    const invoices: InvoiceWithNFT[] = await this.getInvoices({ creditorId: companyId, debtorId: companyId, invoiceId: id });
    this.logger.verbose(invoices.length);
    if (invoices && invoices.length == 1) {
      return invoices[0];
    } else {
      const errorMsg = `Invoice with id ${id} was not found in database.`;
      this.logger.error(errorMsg);
      throw new NotFoundException(errorMsg);
    }
  }

  async getInvoicesByCreditorId(creditorId: string): Promise<InvoiceWithNFT[]> {
    return this.getInvoices({ creditorId });
  }

  async getInvoicesByDebtorId(debtorId: string): Promise<InvoiceWithNFT[]> {
    return this.getInvoices({ debtorId });
  }

  async getInvoicesCorrespondingToCompany(companyId: string): Promise<InvoiceWithNFT[]> {
    return this.getInvoices({ creditorId: companyId, debtorId: companyId });
  }

  async getInvoicesByOrderId(orderId: string, companyId: string): Promise<InvoiceWithNFT[]> {
    return this.getInvoices({ orderId, debtorId: companyId, creditorId: companyId });
  }

  async getInvoices({
    invoiceId,
    orderId,
    creditorId,
    debtorId,
  }: {
    creditorId?: string;
    debtorId?: string;
    orderId?: string;
    invoiceId?: string;
  }): Promise<InvoiceWithNFT[]> {
    this.logger.verbose('Return all invoices from database');
    try {
      const creditorFilter: Prisma.InvoiceWhereInput | undefined = creditorId ? { creditorId: String(creditorId) } : undefined;
      const debtorFilter: Prisma.InvoiceWhereInput | undefined = debtorId ? { debtorId: String(debtorId) } : undefined;
      const orFilters = [creditorFilter, debtorFilter].filter((filter) => filter !== undefined);

      const orderFilter: Prisma.InvoiceWhereInput | undefined = orderId ? { serviceProcess: { orderId: String(orderId) } } : undefined;
      const invoiceFilter: Prisma.InvoiceWhereInput | undefined = invoiceId ? { id: String(invoiceId) } : undefined;
      const andFilters = [orderFilter, invoiceFilter].filter((filter) => filter !== undefined);

      const where: Prisma.InvoiceWhereInput = {
        ...(orFilters.length ? { OR: orFilters } : {}),
        ...(andFilters.length ? { AND: andFilters } : {}),
      };

      return <InvoiceWithNFT[]>await this.prismaService.invoice.findMany({
        where: where,
        include: {
          serviceProcess: {
            select: {
              orderId: true,
            },
          },
          tradeReceivable: {
            select: {
              id: true,
              nft: true,
            },
          },
        },
      });
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
    this.logger.verbose(util.inspect(`Total amount without vat of creditor ${creditorId}: ${totalSum}`));
    return totalSum;
  }
}
