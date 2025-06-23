/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Offer } from '@prisma/client';

export class OfferAmqpDto {
  id: string;
  creationDate: Date;
  price: number;
  status: string;
  orderId: string;
  plannedCalendarWeek: number;
  plannedYear: number;
  decisionDate?: Date;

  constructor(
    id: string,
    creationDate: Date,
    price: number,
    status: string,
    orderId: string,
    plannedCalendarWeek: number,
    plannedYear: number,
    decisionDate?: Date
  ) {
    this.id = id;
    this.creationDate = creationDate;
    this.price = price;
    this.status = status;
    this.orderId = orderId;
    this.plannedCalendarWeek = plannedCalendarWeek;
    this.plannedYear = plannedYear;
    this.decisionDate = decisionDate;
  }

  public static fromPrismaEntities(offers: Offer[], orderId: string): OfferAmqpDto[] {
    const retVal: OfferAmqpDto[] = [];
    for (const offer of offers) {
      retVal.push(this.fromPrismaEntity(offer, orderId));
    }
    return retVal;
  }

  public static fromPrismaEntity(offer: Offer, orderId: string): OfferAmqpDto {
    return <OfferAmqpDto>{
      id: offer.id,
      creationDate: offer.creationDate,
      decisionDate: offer.decisionDate ? offer.decisionDate : null,
      price: Number(offer.price),
      status: offer.status,
      orderId: orderId,
      plannedCalendarWeek: Number(offer.plannedCalendarWeek),
      plannedYear: Number(offer.plannedYear),
    };
  }
}
