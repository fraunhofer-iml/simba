/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatus, TradeReceivable } from '@prisma/client';
import { PaymentStatusAmqpDto } from './payment-status-amqp.dto';

export class TradeReceivableAmqpDto {
  id: string;
  nft: string;
  status: PaymentStatusAmqpDto[];

  constructor(id: string, nft: string, states: PaymentStatusAmqpDto[]) {
    this.id = id;
    this.nft = nft;
    this.status = states;
  }
  public static fromPrismaEntity(tradeReceivable: TradeReceivable, states: PaymentStatus[]): TradeReceivableAmqpDto {
    const paymentStatesAMQP: PaymentStatusAmqpDto[] = [];
    for (const prismaState of states) {
      paymentStatesAMQP.push(PaymentStatusAmqpDto.fromPrismaEntity(prismaState));
    }
    return new TradeReceivableAmqpDto(tradeReceivable.id, tradeReceivable.nft, paymentStatesAMQP);
  }
}
