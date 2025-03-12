/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { CreateTradeReceivableDto } from '../create-trade-receivable.dto';

export const createTradeReceivableDtoMock: CreateTradeReceivableDto = new CreateTradeReceivableDto(
  TradeReceivablesSeed[0].nft,
  TradeReceivablesSeed[0].invoiceId,
  PaymentStatesSeed[3].timestamp
);
