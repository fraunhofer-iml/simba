/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { TradeReceivableDto } from '../trade-receivable.dto';

export const TradeReceivableMock = <TradeReceivableDto[]>[
  {
    id: TradeReceivablesSeed[0].id,
    nft: TradeReceivablesSeed[0].nft,
    status: [
      {
        status: PaymentStatesSeed[0].status,
        timestamp: PaymentStatesSeed[0].timestamp,
      },
      {
        status: PaymentStatesSeed[1].status,
        timestamp: PaymentStatesSeed[1].timestamp,
      },
    ],
  },
  {
    id: TradeReceivablesSeed[1].id,
    nft: TradeReceivablesSeed[1].nft,
    status: [
      {
        status: PaymentStatesSeed[2].status,
        timestamp: PaymentStatesSeed[2].timestamp,
      },
      {
        status: PaymentStatesSeed[3].status,
        timestamp: PaymentStatesSeed[3].timestamp,
      },
    ],
  },
];
