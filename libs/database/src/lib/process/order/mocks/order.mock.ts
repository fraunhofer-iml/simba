/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CompaniesSeed,
  MachinesSeed,
  OrderLinesSeed,
  OrdersSeed,
  ProductsSeed,
  ServiceProcessesSeed,
  ServiceStatesSeed,
} from '../../../../seed';
import { OrderOverview } from '../types/order-overview.types';

export const OrderOverviewPrismaMock: any[] = <OrderOverview[]>[
  {
    id: OrdersSeed[0].id,
    documentIssueDate: OrdersSeed[0].documentIssueDate,
    vatCurrency: OrdersSeed[0].vatCurrency,
    orderLines: [{ item: ProductsSeed[0], requestedQuantity: OrderLinesSeed[0].requestedQuantity }],
    serviceProcess: {
      id: ServiceProcessesSeed[0].id,
      orderId: ServiceProcessesSeed[0].orderId,
      scheduledDate: null,
      acceptedOfferId: null,
      dueCalendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
      states: [ServiceStatesSeed[0]],
      dueYear: ServiceProcessesSeed[0].dueYear,
      machineAssignments: [{ machine: MachinesSeed[0] }, { machine: MachinesSeed[1] }],
      offers: [],
      acceptedOffer: null,
      invoices: [],
    },
    buyer: { id: CompaniesSeed[0].id, name: CompaniesSeed[0].name },
    seller: { id: CompaniesSeed[1].id, name: CompaniesSeed[1].name },
  },
  {
    id: OrdersSeed[1].id,
    documentIssueDate: OrdersSeed[1].documentIssueDate,
    vatCurrency: OrdersSeed[0].vatCurrency,
    orderLines: [{ item: ProductsSeed[0], requestedQuantity: OrderLinesSeed[1].requestedQuantity }],
    serviceProcess: {
      id: ServiceProcessesSeed[1].id,
      orderId: ServiceProcessesSeed[1].orderId,
      scheduledDate: null,
      acceptedOfferId: null,
      dueCalendarWeek: ServiceProcessesSeed[1].dueCalendarWeek,
      dueYear: ServiceProcessesSeed[1].dueYear,
      states: [ServiceStatesSeed[4], ServiceStatesSeed[5]],
      machineAssignments: [{ machine: MachinesSeed[0] }, { machine: MachinesSeed[1] }],
      offers: [],
      acceptedOffer: null,
      invoices: [],
    },
    buyer: { id: CompaniesSeed[0].id, name: CompaniesSeed[0].name },
    seller: { id: CompaniesSeed[1].id, name: CompaniesSeed[1].name },
  },
];
