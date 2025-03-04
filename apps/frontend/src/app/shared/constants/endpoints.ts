export const ApiEndpoints = {
  offers: {
    getAllOffers: '/offers',
    acceptOffer: '/accept',
    declineAllOffers: '/decline',
  },
  orders: {
    getAllOrders: '/orders',
  },
  products: {
    getAllProducts: '/products',
  },
  tradeReceivables: {
    getAllTradeReceivablesForOrder: '/trade-receivables?orderId=',
    getALlTradeReceivableNfts: '/trade-receivables/nft',
  },
  invoices: {
    getAllInvoices: '/invoices',
    updatePaymentStatus: '/invoices/payment-status',
    getPaidStatistics: '/invoices/statistics/paid',
    getUnPaidStatistics: '/invoices/statistics/unpaid',
  },
};
