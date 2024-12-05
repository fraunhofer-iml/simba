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
    getPaidTradeReceivablesStatistics: '/trade-receivables/statistics/paid',
    getUnPaidTradeReceivablesStatistics: '/trade-receivables/statistics/unpaid',
  },
  invoices: {
    getAllInvoices: '/invoices',
  },
};
