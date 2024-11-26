export enum TradeReceivableMessagePatterns {
  CREATE = 'trade-receivables/create',
  READ_ALL = 'trade-receivables/read-all',
  READ_BY_ID = 'trade-receivables/read-by-id',
  READ_BY_DEBTOR_ID = 'trade-receivables/read-by-debtor-id',
  READ_BY_CREDITOR_ID = 'trade-receivables/read-by-creditor-id',
  READ_BY_ORDER_ID = 'trade-receivables/read-by-order-id',
  READ_TR_STATISTICS_PAID = 'trade-receivables/read-tr-statistics-paid',
  READ_TR_STATISTICS_NOT_PAID = 'trade-receivables/read-tr-statistics-not-paid',
  READ_ALL_BY_PAYMENT_STATE = 'trade-receivables/read-all-by-payment-state-and-creditor-id',
}
