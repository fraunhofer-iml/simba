/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatusAmqpDto, TradeReceivableAmqpDto } from '@ap3/amqp';

export class TradeReceivableDto {
  id: string;
  nft: string;
  status: PaymentStatusAmqpDto[];

  constructor(id: string, nft: string, states: PaymentStatusAmqpDto[]) {
    this.id = id;
    this.nft = nft;
    this.status = states;
  }
  public static fromAmqpDto(tradeReceivable: TradeReceivableAmqpDto): TradeReceivableDto {
    return new TradeReceivableDto(tradeReceivable.id, tradeReceivable.nft, tradeReceivable.status);
  }
}
