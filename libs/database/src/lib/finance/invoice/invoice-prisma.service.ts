import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { InvoiceCountAndDueMonth, InvoiceForZugferd, InvoiceSumTotalAmountWithoutVatTypes, InvoiceWithNFT } from './types';

@Injectable()
export class InvoicePrismaService {
  private logger = new Logger(InvoicePrismaService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice | null> {
    this.logger.verbose(`Insert new invoice ${util.inspect(data)}`);
    try {
      return await this.prismaService.invoice.create({ data });
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
    invoiceIds,
    orderId,
    creditorId,
    debtorId,
  }: {
    creditorId?: string;
    debtorId?: string;
    orderId?: string;
    invoiceIds?: string[];
  }): Promise<InvoiceWithNFT[]> {
    this.logger.verbose('Return all invoices from database');
    try {
      const creditorFilter: Prisma.InvoiceWhereInput | undefined = creditorId ? { creditorId: String(creditorId) } : undefined;
      const debtorFilter: Prisma.InvoiceWhereInput | undefined = debtorId ? { debtorId: String(debtorId) } : undefined;
      const orFilters = [creditorFilter, debtorFilter].filter((filter) => filter !== undefined);

      const orderFilter: Prisma.InvoiceWhereInput | undefined = orderId ? { serviceProcess: { orderId: String(orderId) } } : undefined;
      const invoiceFilter: Prisma.InvoiceWhereInput | undefined =
        invoiceIds && invoiceIds.length > 0 ? { id: { in: invoiceIds } } : undefined;
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

  async countInvoicesDueInMonth(year: number, whereQuery: Prisma.Sql): Promise<InvoiceCountAndDueMonth[]> {
    try {
      return <InvoiceCountAndDueMonth[]>await this.prismaService.$queryRaw`
        SELECT COUNT(*) as invoice_count, TO_CHAR(DATE_TRUNC('month', iv."dueDate"), 'YYYY-MM') as due_month
        FROM "Invoice" AS iv
        where ${whereQuery}
        GROUP BY due_month;
      `;
    } catch (e) {
      this.logger.error(e);
      this.logger.error(`It was not possible to get trade receivable ids for ${year}`);
      throw e;
    }
  }

  async sumInvoiceAmountsForTradeReceivables({
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
}
