/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentInformationAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentInformationDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  iBAN: string;
  @ApiProperty()
  BIC: string;

  constructor(id: string, iBAN: string, BIC: string) {
    this.id = id;
    this.iBAN = iBAN;
    this.BIC = BIC;
  }

  public static fromAmqpDto(paymentInformationAmqpDto: PaymentInformationAmqpDto) {
    return new PaymentInformationDto(paymentInformationAmqpDto.id, paymentInformationAmqpDto.iBAN, paymentInformationAmqpDto.BIC);
  }
}
