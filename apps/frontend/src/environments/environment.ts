const BASE_URL = 'http://localhost:3000';

export const environment = {
  production: false,
  OFFERS: {
    URL: `${BASE_URL}/offers`,
    ACCEPT: '/accept',
    DECLINE: `${BASE_URL}/offers/decline`,
  },
  ORDERS: {
    URL: `${BASE_URL}/orders`,
  },
  PRODUCTS: {
    URL: `${BASE_URL}/products`,
  },
  TRADERECEIVABLES: {
    URL: `${BASE_URL}/trade-receivables`,
  },
};

export const ROUTING = {
  newOrders: '/orders/new',
  login: '/login',
  accept: '/accept',
  orders: '/orders',
  wallet: '/wallet',
  production: '/production',
};
