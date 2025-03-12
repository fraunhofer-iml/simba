/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateTradeReceivableAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTradeReceivableDto {
  @ApiProperty()
  nft: string;
  @ApiProperty()
  invoiceId: string;
  @ApiProperty({ type: Date })
  statusTimestamp: Date;

  constructor(nft: string, invoiceId: string, statusTimestamp: Date) {
    this.nft = nft;
    this.invoiceId = invoiceId;
    this.statusTimestamp = statusTimestamp;
  }

  public toCreateTradeReceivableAmqpDto(): CreateTradeReceivableAmqpDto {
    return new CreateTradeReceivableAmqpDto(this.statusTimestamp, this.nft, this.invoiceId);
  }
}
