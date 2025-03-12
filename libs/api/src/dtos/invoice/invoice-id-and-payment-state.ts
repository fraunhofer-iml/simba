/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceIdAndPaymentStateAmqpDto } from '@ap3/amqp';
import { PaymentStates } from '@ap3/util';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceIdAndPaymentStateDto {
  @ApiProperty()
  invoiceId: string;
  @ApiProperty({
    type: String,
    enum: PaymentStates,
  })
  paymentStatus: string;

  constructor(invoiceId: string, paymentState: string) {
    this.invoiceId = invoiceId;
    this.paymentStatus = paymentState;
  }

  public toAMQPDto(): InvoiceIdAndPaymentStateAmqpDto {
    return <InvoiceIdAndPaymentStateAmqpDto>{
      invoiceId: this.invoiceId,
      paymentStatus: this.paymentStatus,
    };
  }
}
