export enum InvoiceMessagePatterns {
  CREATE = 'invoices/create',
  READ_ALL = 'invoices/read-all',
  READ_BY_ID = 'invoices/read-by-id',
  READ_BY_DEBTOR_ID = 'invoices/read-by-debtor-id',
  READ_BY_CREDITOR_ID = 'invoices/read-by-creditor-id',
  READ_ALL_BY_PAYMENT_STATE = 'invoices/read-all-by-payment-state-and-creditor-id',
  CREATE_AND_UPLOAD_ZUGFERD_PDF = 'invoices/create-and-upload-zugferd-pdf',
}
