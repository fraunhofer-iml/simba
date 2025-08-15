/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllInvoicesFilterAmqpDto, InvoiceAmqpDto } from '@ap3/amqp';
import { FinancialRoles } from '@ap3/util';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { QueryBuilderHelperService } from '../util/query-builder-helper.service';
import {
  InvoiceCountAndDueMonth,
  InvoiceForZugferd,
  InvoicePrismaService,
  InvoiceSumTotalAmountWithoutVatTypes,
  InvoiceWithNFT,
} from './invoice';

@Injectable()
export class InvoiceDatabaseAdapterService {
  private logger = new Logger(InvoiceDatabaseAdapterService.name);

  constructor(
    private readonly queryBuilderService: QueryBuilderHelperService,
    private readonly invoicePrismaService: InvoicePrismaService
  ) {}

  async createInvoice(invoiceAmqpDto: InvoiceAmqpDto): Promise<Invoice> {
    this.logger.verbose('Create new invoice');
    return (await this.invoicePrismaService.createInvoice({
      invoiceNumber: invoiceAmqpDto.invoiceNumber,
      dueDate: invoiceAmqpDto.invoiceDueDate,
      contractCurrency: invoiceAmqpDto.currency,
      measuringUnit: invoiceAmqpDto.measuringUnit,
      netPricePerUnit: invoiceAmqpDto.netPricePerUnit,
      totalAmountWithoutVat: invoiceAmqpDto.totalAmountWithoutVat,
      vat: invoiceAmqpDto.vat,
      url: '',
      paymentTerms: invoiceAmqpDto.paymentTerms,
      serviceProcess: { connect: { id: invoiceAmqpDto.serviceProcessId } },
      debtor: { connect: { id: invoiceAmqpDto.debtorId } },
      creditor: { connect: { id: invoiceAmqpDto.creditorId } },
    }))!;
  }

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

  async getInvoiceByNumber(invoiceNumber: string): Promise<InvoiceWithNFT> {
    this.logger.verbose('Return invoice by invoice number from database');
    const invoices: InvoiceWithNFT[] = await this.invoicePrismaService.getInvoices({
      invoiceNumbers: [invoiceNumber],
    });
    if (invoices && invoices.length == 1) {
      return invoices[0];
    } else {
      const errorMsg = `Invoice with number ${invoiceNumber} was not found in database.`;
      this.logger.error(errorMsg);
      throw new NotFoundException(errorMsg);
    }
  }

  async getInvoicesCorrespondingToFilterParams(filterParams: AllInvoicesFilterAmqpDto, invoiceIds: string[]): Promise<InvoiceWithNFT[]> {
    return this.invoicePrismaService.getInvoices({
      creditorId: filterParams.creditorId,
      debtorId: filterParams.debtorId,
      invoiceIds: invoiceIds,
      paymentStates: filterParams.paymentStates,
      orderNumber: filterParams.orderNumber,
    });
  }

  async countInvoicesDueInMonthByFinancialRole(
    filteredInvoiceIds: string[],
    financialRole: string,
    year: number,
    companyId: string
  ): Promise<InvoiceCountAndDueMonth[]> {
    const financialQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFinancialRole(financialRole, companyId);
    const invoiceQuery: Prisma.Sql = this.queryBuilderService.buildRawQueryForFilteredInvoiceIds(filteredInvoiceIds);
    return this.invoicePrismaService.countInvoicesDueInMonth(year, financialQuery, invoiceQuery);
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
