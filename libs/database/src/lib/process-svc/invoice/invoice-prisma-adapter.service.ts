import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { InvoiceCountAndDueMonth, InvoiceForZugferd, InvoiceSumTotalAmountWithoutVatTypes, InvoiceWithNFT } from '../../types';
import { QueryBuilderHelperService } from '../query-builder-helper.service';
import { InvoicePrismaService } from './invoice-prisma.service';

@Injectable()
export class InvoicePrismaAdapterService {
  private logger = new Logger(InvoicePrismaAdapterService.name);

  constructor(
    private readonly queryBuilderService: QueryBuilderHelperService,
    private readonly invoicePrismaService: InvoicePrismaService
  ) {}

  async updateInvoiceURL(invoiceId: string, url: string): Promise<void> {
    const updateUrlData: Prisma.InvoiceUpdateInput = { url: url };
    await this.invoicePrismaService.updateInvoice(invoiceId, updateUrlData);
  }

  async getInvoiceById(id: string, companyId?: string): Promise<InvoiceWithNFT> {
    this.logger.verbose('Return invoice by id from database');
    const invoices: InvoiceWithNFT[] = await this.invoicePrismaService.getInvoices({
      creditorId: companyId,
      debtorId: companyId,
      invoiceId: id,
    });
    if (invoices && invoices.length == 1) {
      return invoices[0];
    } else {
      const errorMsg = `Invoice with id ${id} was not found in database.`;
      this.logger.error(errorMsg);
      throw new NotFoundException(errorMsg);
    }
  }

  async getInvoicesByCreditorId(creditorId: string): Promise<InvoiceWithNFT[]> {
    return this.invoicePrismaService.getInvoices({ creditorId });
  }

  async getInvoicesByDebtorId(debtorId: string): Promise<InvoiceWithNFT[]> {
    return this.invoicePrismaService.getInvoices({ debtorId });
  }

  async getInvoicesCorrespondingToCompany(companyId: string): Promise<InvoiceWithNFT[]> {
    return this.invoicePrismaService.getInvoices({ creditorId: companyId, debtorId: companyId });
  }

  async getInvoicesByOrderId(orderId: string, companyId: string): Promise<InvoiceWithNFT[]> {
    return this.invoicePrismaService.getInvoices({ orderId, debtorId: companyId, creditorId: companyId });
  }

  async countInvoicesDueInMonthByFinancialRole(financialRole: string, year: number, companyId: string): Promise<InvoiceCountAndDueMonth[]> {
    const query: Prisma.Sql = this.queryBuilderService.buildRawQueryForFinancialRole(financialRole, companyId);
    return this.invoicePrismaService.countInvoicesDueInMonth(year, query);
  }

  async sumInvoiceAmountsForTradeReceivablesByFinancialRole(
    financialRole: string,
    invoiceIds: string[],
    companyId: string
  ): Promise<InvoiceSumTotalAmountWithoutVatTypes> {
    const query: Prisma.InvoiceWhereInput | null = this.queryBuilderService.buildQueryForFinancialRole(
      financialRole,
      companyId,
      invoiceIds
    );
    if (!query) {
      return { _sum: { totalAmountWithoutVat: new Decimal(0) } };
    }
    return this.invoicePrismaService.sumInvoiceAmountsForTradeReceivables(query);
  }

  async getInvoiceByIdForZugferd(id: string, companyId: string): Promise<InvoiceForZugferd> {
    return this.invoicePrismaService.getInvoiceByIdForZugferd(id, companyId);
  }
}
