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
    getAllTradeReceivablesForDebtor: '/trade-receivables?debtorId=',
    getAllTradeReceivablesForCreditor: '/trade-receivables?creditorId=',
    getAllTradeReceivablesForOrder: '/trade-receivables?orderId=',
  },
};
