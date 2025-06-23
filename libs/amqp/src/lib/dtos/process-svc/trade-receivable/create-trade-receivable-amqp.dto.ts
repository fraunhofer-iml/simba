/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { TradeReceivableAmqpDto } from './trade-receivable-amqp.dto';

export class CreateTradeReceivableAmqpDto extends OmitType(TradeReceivableAmqpDto, ['id', 'status'] as const) {
  statusTimestamp: Date;
  invoiceId: string;

  constructor(statusTimestamp: Date, nft: string, invoiceId: string) {
    super();
    this.nft = nft;
    this.invoiceId = invoiceId;
    this.statusTimestamp = statusTimestamp;
  }
  public toPrismaCreateEntity(): Prisma.TradeReceivableCreateInput {
    return <Prisma.TradeReceivableCreateInput>{
      nft: this.nft,
      invoice: { connect: { id: this.invoiceId } },
      states: { create: { status: PaymentStates.OPEN, timestamp: this.statusTimestamp } },
    };
  }
}
