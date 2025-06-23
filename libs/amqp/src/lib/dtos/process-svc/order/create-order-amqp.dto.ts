/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ORDER_NUMBER_PREFIX } from '@ap3/util';
import { format } from 'date-fns';
import { PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { OrderAmqpDto } from './order-amqp.dto';

export class CreateOrderAmqpDto extends PickType(OrderAmqpDto, [
  'productId',
  'quantity',
  'requestedYear',
  'requestedCalendarWeek',
  'customerId',
]) {
  vatCurrency: string;
  buyerId: string;
  sellerId: string;
  unitOfMeasureCode: string;

  constructor(vatCurrency: string, buyerId: string, sellerId: string, unitOfMeasureCode: string) {
    super();
    this.vatCurrency = vatCurrency;
    this.buyerId = buyerId;
    this.sellerId = sellerId;
    this.unitOfMeasureCode = unitOfMeasureCode;
  }

  public toPrismaCreateEntity(): Prisma.OrderCreateInput {
    return <Prisma.OrderCreateInput>{
      totalAmountWithoutVat: null,
      vatCurrency: this.vatCurrency,
      buyer: { connect: { id: this.buyerId } },
      seller: { connect: { id: this.sellerId } },
      buyerOrderRefDocumentId: `${ORDER_NUMBER_PREFIX}${format(new Date(), 'yyMMddHHmmSSS')}`,
      serviceProcess: {
        create: { dueCalendarWeek: this.requestedCalendarWeek, dueYear: this.requestedYear },
      },
      orderLines: {
        create: {
          requestedQuantity: this.quantity,
          unitOfMeasureCodeAgreed: this.unitOfMeasureCode,
          unitOfMeasureCodeRequested: this.unitOfMeasureCode,
          item: {
            connect: {
              id: this.productId,
            },
          },
        },
      },
    };
  }
}
