/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { paymentStatesSeed, tradeReceivablesSeed } from '@ap3/database';
import { TradeReceivableAmqpDto } from '../trade-receivable-amqp.dto';

export const tradeReceivableAMQPMock = <TradeReceivableAmqpDto[]>[
  {
    id: tradeReceivablesSeed[0].id,
    nft: tradeReceivablesSeed[0].nft,
    status: [
      {
        status: paymentStatesSeed[0].status,
        timestamp: paymentStatesSeed[0].timestamp,
      },
      {
        status: paymentStatesSeed[1].status,
        timestamp: paymentStatesSeed[1].timestamp,
      },
    ],
  },
  {
    id: tradeReceivablesSeed[1].id,
    nft: tradeReceivablesSeed[1].nft,
    status: [
      {
        status: paymentStatesSeed[2].status,
        timestamp: paymentStatesSeed[2].timestamp,
      },
      {
        status: paymentStatesSeed[3].status,
        timestamp: paymentStatesSeed[3].timestamp,
      },
    ],
  },
];
