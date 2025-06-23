/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceDto } from '@ap3/api';

export class Invoice {
  id: string;
  invoiceNumber: string;
  creditor: string;
  creditorId: string;
  totalAmountWithoutVat: string;
  invoiceDueDate: string;
  debtor: string;
  debtorId: string;
  paymentStatus: string;
  url: string;
  displayedStatus: string;
  currency: string;
  orderNumber: string;

  constructor(invoice: InvoiceDto) {
    this.id = invoice.id;
    this.invoiceNumber = invoice.invoiceNumber;
    this.creditorId = invoice.creditorId;
    this.creditor = invoice.creditor;
    this.totalAmountWithoutVat = invoice.totalAmountWithoutVat.toFixed(2);
    this.invoiceDueDate = invoice.invoiceDueDate;
    this.debtor = invoice.debtor;
    this.debtorId = invoice.debtorId;
    this.paymentStatus = invoice.paymentStatus;
    this.url = invoice.url;
    this.displayedStatus = invoice.paymentStatus;
    this.currency = invoice.currency;
    this.orderNumber = invoice.orderNumber;
  }

  public static convertToInvoice(invoices: InvoiceDto[]): Invoice[] {
    const flatInvoices: Invoice[] = [];
    invoices.forEach((invoice: InvoiceDto) => {
      flatInvoices.push(new Invoice(invoice));
    });
    return flatInvoices;
  }
}
