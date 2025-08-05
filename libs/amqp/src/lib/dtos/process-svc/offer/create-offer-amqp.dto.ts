/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferStatesEnum } from '@ap3/util';
import { PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { OfferAmqpDto } from './offer-amqp.dto';

export class CreateOfferAmqpDto extends PickType(OfferAmqpDto, [
  'basicPrice',
  'timeToProduction',
  'utilization',
  'status',
  'orderId',
  'plannedCalendarWeek',
  'plannedYear',
]) {
  public toPrismaEntity(): Prisma.OfferCreateInput {
    return <Prisma.OfferCreateInput>{
      creationDate: new Date(),
      basicPrice: this.basicPrice,
      timeToProduction: this.timeToProduction,
      utilization: this.utilization,
      status: OfferStatesEnum.OPEN,
      plannedCalendarWeek: this.plannedCalendarWeek,
      plannedYear: this.plannedYear,
      serviceProcess: {
        connect: {
          orderId: this.orderId,
        },
      },
    };
  }
}
