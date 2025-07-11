/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

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
    updateTradeReceivableNfts: '/trade-receivables/nft',
  },
  invoices: {
    getAllInvoices: '/invoices',
    updatePaymentStatus: '/invoices/payment-status',
    getPaidStatistics: '/invoices/statistics/paid',
    getUnPaidStatistics: '/invoices/statistics/unpaid',
  },
  companies: {
    getAllCompanies: '/companies',
  },
};
