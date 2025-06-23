/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { CreateTradeReceivableAmqpDto } from '../create-trade-receivable-amqp.dto';

export const CreateTradeReceivableAMQPMock = new CreateTradeReceivableAmqpDto(
  PaymentStatesSeed[3].timestamp,
  TradeReceivablesSeed[0].nft,
  TradeReceivablesSeed[0].invoiceId
);
