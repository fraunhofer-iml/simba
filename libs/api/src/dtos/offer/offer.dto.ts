/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';
import { APIUtil } from '../../util/util';

export class OfferDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  creationDate: string;
  @ApiProperty()
  basePrice: number;
  @ApiProperty()
  utilizationPrice: number;
  @ApiProperty()
  fixedCosts: number;

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
    fixedCosts: number,
    status: string,
    orderId: string,
    plannedCalendarWeek: number,
    plannedYear: number
  ) {
    this.id = id;
    this.creationDate = creationDate;
    this.basePrice = basePrice;
    this.utilizationPrice = utilizationPrice;
    this.fixedCosts = fixedCosts;
    this.status = status;
    this.orderId = orderId;
    this.plannedCalendarWeek = plannedCalendarWeek;
    this.plannedYear = plannedYear;
  }

  // BasePrice, UtilizationPrice and FixedCosts remain Mocked until Backend OfferEntity gets added the necessary Attributes
  public static toOfferDto(offer: OfferAmqpDto): OfferDto {
    const mockPrices = APIUtil.getMockOfferPrices(offer);

    return new OfferDto(
      offer.id,
      new Date(offer.creationDate).toISOString(),
      mockPrices.basePrice,
      mockPrices.utilityPrice,
      mockPrices.fixedCosts,
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
