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
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[0].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[1].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-08T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[1].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[2].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-10T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[2].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-10T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[3].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[4].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[5].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[6].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[7].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[8].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[9].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[9].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[10].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-08T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[10].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[11].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-10T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[11].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-10T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[12].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[12].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-12T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[13].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[13].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-12T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[14].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[15].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[16].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[16].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[17].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-08T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[17].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[18].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-10T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[18].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-10T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[19].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[19].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-12T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[20].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[20].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-12T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[21].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[22].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[23].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[23].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[24].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-08T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[24].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[25].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-10T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[25].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-10T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[26].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[26].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-12T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[27].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[27].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[28].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[29].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[30].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[30].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[31].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-08T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[31].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[32].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-10-10T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[32].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-11-10T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[33].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-08-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[33].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[34].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-08-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[34].id,
    status: PaymentStates.PAID,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[35].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[36].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[37].id,
    status: PaymentStates.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  },
];
