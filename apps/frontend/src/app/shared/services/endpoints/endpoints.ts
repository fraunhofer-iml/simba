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
    getAllTradeReceivables: '/trade-receivables',
  },
  invoices: {
    getAllInvoices: '/invoices'
  }
};
