/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatus } from '@prisma/client';
import { PaymentStates } from '../../../util/src';
import { TradeReceivablesSeed } from './trade-receivables.seed';

export const PaymentStatesSeed = <PaymentStatus[]>[
  {
    tradeReceivableId: TradeReceivablesSeed[0].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-12T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[0].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[1].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-22T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[1].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-23T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[2].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-23T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[2].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-24T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[3].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-27T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[3].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2024-11-27T07:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[4].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-11-09T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[4].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2024-12-09T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[5].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-11-11T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[5].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-11-12T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[6].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-11-18T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[6].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-11-19T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[7].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-11-20T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[7].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2024-12-20T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[8].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-11-21T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[8].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2024-12-21T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[9].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-11-25T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[9].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-12-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[10].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-12-01T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[10].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-12-14T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[11].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-12-06T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[11].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-12-10T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[12].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-12-17T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[12].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-12-20T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[13].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-01-15T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[13].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-01-19T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[14].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-01-20T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[14].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2025-02-20T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[15].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-01-21T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[15].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2025-02-21T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[16].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-01-24T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[16].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-01-27T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[17].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-01-26T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[17].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-01-29T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[18].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-01-28T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[18].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-01-29T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[19].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-02-03T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[19].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-02-12T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[20].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-02-05T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[20].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-02-12T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[21].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-02-09T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[21].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2025-03-09T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[22].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-02-17T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[22].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2025-03-17T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[23].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-02-19T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[23].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-02-25T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[24].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-03-07T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[24].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-03-09T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[25].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-03-10T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[25].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-03-12T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[26].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-03-12T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[26].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-03-14T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[27].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-03-15T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[27].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-03-17T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[28].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-03-23T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[28].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2025-04-23T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[29].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-04-01T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[29].id,
    status: PaymentStates.EXCEEDED,
    timestamp: new Date('2025-05-01T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[30].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-04-03T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[30].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-04-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[31].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-04-09T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[31].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-04-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[32].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-04-10T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[32].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-04-18T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[33].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-04-10T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[33].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2025-04-12T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[34].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-05-04T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[35].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-05-11T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[36].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-05-17T00:00:00Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[37].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2025-05-19T00:00:00Z'),
  }
];
