/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class OfferDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  creationDate: string;
  @ApiProperty()
  basicPrice: number;
  @ApiProperty()
  utilization: number;
  @ApiProperty()
  timeUntilProduction: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  plannedCalendarWeek: number;
  @ApiProperty()
  plannedYear: number;

  constructor(
    id: string,
    creationDate: string,
    basePrice: number,
    utilizationPrice: number,
    timeUntilProduction: number,
    status: string,
    orderId: string,
    plannedCalendarWeek: number,
    plannedYear: number
  ) {
    this.id = id;
    this.creationDate = creationDate;
    this.basicPrice = basePrice;
    this.utilization = utilizationPrice;
    this.timeUntilProduction = timeUntilProduction;
    this.status = status;
    this.orderId = orderId;
    this.plannedCalendarWeek = plannedCalendarWeek;
    this.plannedYear = plannedYear;
  }

  public static toOfferDto(offer: OfferAmqpDto): OfferDto {
    return new OfferDto(
      offer.id,
      new Date(offer.creationDate).toISOString(),
      offer.basicPrice,
      offer.utilization,
      offer.timeToProduction,
      offer.status,
      offer.orderId,
      offer.plannedCalendarWeek,
      offer.plannedYear
    );
  }

  public static toOfferDtos(offers: OfferAmqpDto[]): OfferDto[] {
    return offers.map((offer: OfferAmqpDto): OfferDto => {
      return this.toOfferDto(offer);
    });
  }
}
