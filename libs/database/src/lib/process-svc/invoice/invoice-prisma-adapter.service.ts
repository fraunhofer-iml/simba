import { AllInvoicesFilterAmqpDto } from '@ap3/amqp';
import { FinancialRoles } from '@ap3/util';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { QueryBuilderHelperService } from '../query-builder-helper.service';
import { InvoicePrismaService } from './invoice-prisma.service';
import { InvoiceCountAndDueMonth, InvoiceForZugferd, InvoiceSumTotalAmountWithoutVatTypes, InvoiceWithNFT } from './types';

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
      invoiceIds: [id],
    });
    if (invoices && invoices.length == 1) {
      return invoices[0];
    } else {
      const errorMsg = `Invoice with id ${id} was not found in database.`;
      this.logger.error(errorMsg);
      throw new NotFoundException(errorMsg);
    }
  }
  async getInvoicesCorrespondingToFilterParams(filterParams: AllInvoicesFilterAmqpDto, invoiceIds: string[]): Promise<InvoiceWithNFT[]> {
    return this.invoicePrismaService.getInvoices({
      creditorId: filterParams.creditorId,
      debtorId: filterParams.debtorId,
      invoiceIds: invoiceIds,
    });
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
    let invoiceSum: InvoiceSumTotalAmountWithoutVatTypes | null = null;
    if (financialRole === FinancialRoles.CREDITOR) {
      invoiceSum = await this.invoicePrismaService.sumInvoiceAmountsForTradeReceivables({ invoiceIds: invoiceIds, creditorId: companyId });
    } else if (financialRole === FinancialRoles.DEBTOR) {
      invoiceSum = await this.invoicePrismaService.sumInvoiceAmountsForTradeReceivables({ invoiceIds: invoiceIds, debtorId: companyId });
    }
    if (!invoiceSum) {
      return { _sum: { totalAmountWithoutVat: new Decimal(0) } };
    }
    return invoiceSum;
  }

  async getInvoiceByIdForZugferd(id: string, companyId: string): Promise<InvoiceForZugferd> {
    return this.invoicePrismaService.getInvoiceByIdForZugferd(id, companyId);
  }
}
