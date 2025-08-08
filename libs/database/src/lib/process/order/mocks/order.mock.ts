/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  companiesSeed,
  machinesSeed,
  offersSeed,
  orderLinesSeed,
  ordersSeed,
  productsSeed,
  serviceProcessesSeed,
  serviceStatesSeed,
} from '../../../../seed';
import { OrderWithDependencies } from '../types/order-overview.types';

export const orderOverviewPrismaMock: any[] = <OrderWithDependencies[]>[
  {
    id: ordersSeed[0].id,
    buyerOrderRefDocumentId: ordersSeed[0].buyerOrderRefDocumentId,
    documentIssueDate: ordersSeed[0].documentIssueDate,
    vatCurrency: ordersSeed[0].vatCurrency,
    totalAmountWithoutVat: ordersSeed[0].totalAmountWithoutVat,
    orderLines: [
      {
        item: productsSeed[0],
        requestedQuantity: orderLinesSeed[0].requestedQuantity,
        netPrice: orderLinesSeed[0].netPrice,
        unitOfMeasureCodeAgreed: orderLinesSeed[0].unitOfMeasureCodeAgreed,
      },
    ],
    serviceProcess: {
      id: serviceProcessesSeed[0].id,
      orderId: serviceProcessesSeed[0].orderId,
      scheduledDate: null,
      acceptedOfferId: null,
      dueCalendarWeek: serviceProcessesSeed[0].dueCalendarWeek,
      states: [serviceStatesSeed[0]],
      dueYear: serviceProcessesSeed[0].dueYear,
      machineAssignments: [{ machine: machinesSeed[0] }, { machine: machinesSeed[1] }],
      offers: [],
      acceptedOffer: null,
      invoices: [],
    },
    buyer: { id: companiesSeed[0].id, name: companiesSeed[0].name },
    seller: { id: companiesSeed[1].id, name: companiesSeed[1].name },
  },
  {
    id: ordersSeed[1].id,
    buyerOrderRefDocumentId: ordersSeed[1].buyerOrderRefDocumentId,
    documentIssueDate: ordersSeed[1].documentIssueDate,
    vatCurrency: ordersSeed[0].vatCurrency,
    totalAmountWithoutVat: ordersSeed[0].totalAmountWithoutVat,
    orderLines: [
      {
        item: productsSeed[0],
        requestedQuantity: orderLinesSeed[1].requestedQuantity,
        netPrice: orderLinesSeed[0].netPrice,
        unitOfMeasureCodeAgreed: orderLinesSeed[0].unitOfMeasureCodeAgreed,
      },
    ],
    serviceProcess: {
      id: serviceProcessesSeed[1].id,
      orderId: serviceProcessesSeed[1].orderId,
      scheduledDate: null,
      acceptedOfferId: offersSeed[1].id,
      dueCalendarWeek: serviceProcessesSeed[1].dueCalendarWeek,
      dueYear: serviceProcessesSeed[1].dueYear,
      states: [serviceStatesSeed[4], serviceStatesSeed[5]],
      machineAssignments: [{ machine: machinesSeed[0] }, { machine: machinesSeed[1] }],
      offers: [],
      acceptedOffer: offersSeed[1],
      invoices: [],
    },
    buyer: { id: companiesSeed[0].id, name: companiesSeed[0].name },
    seller: { id: companiesSeed[1].id, name: companiesSeed[1].name },
  },
];
