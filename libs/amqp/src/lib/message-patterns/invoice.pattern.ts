/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum InvoiceMessagePatterns {
  CREATE = 'invoices/create',
  READ_ALL = 'invoices/read-all',
  READ_BY_ID = 'invoices/read-by-id',
  READ_BY_DEBTOR_ID = 'invoices/read-by-debtor-id',
  READ_BY_CREDITOR_ID = 'invoices/read-by-creditor-id',
  READ_ALL_BY_PAYMENT_STATE = 'invoices/read-all-by-payment-state-and-creditor-id',
  CREATE_AND_UPLOAD_ZUGFERD_PDF = 'invoices/create-and-upload-zugferd-pdf',
  READ_STATISTICS_PAID = 'invoices/read-statistics-paid',
  READ_STATISTICS_NOT_PAID = 'invoices/read-statistics-not-paid',
  CREATE_NEW_PAYMENT_STATUS_FOR_INVOICE = 'invoices/payment-status',
}
