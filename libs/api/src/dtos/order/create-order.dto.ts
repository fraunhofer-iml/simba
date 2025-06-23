/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateOrderAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  productId: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  year: number;
  @ApiProperty()
  calendarWeek: number;
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  unitOfMeasureCode: string;

  constructor(productId: string, amount: number, year: number, calendarWeek: number, customerId: string, unitOfMeasureCode: string) {
    this.productId = productId;
    this.amount = amount;
    this.year = year;
    this.calendarWeek = calendarWeek;
    this.customerId = customerId;
    this.unitOfMeasureCode = unitOfMeasureCode;
  }

  public toAMQPDto(operatorId: string, currency: string): CreateOrderAmqpDto {
    return <CreateOrderAmqpDto>{
      vatCurrency: currency,
      buyerId: this.customerId,
      sellerId: operatorId,
      productId: this.productId,
      quantity: this.amount,
      requestedYear: this.year,
      requestedCalendarWeek: this.calendarWeek,
      customerId: this.customerId,
      unitOfMeasureCode: this.unitOfMeasureCode
    };
  }
}
