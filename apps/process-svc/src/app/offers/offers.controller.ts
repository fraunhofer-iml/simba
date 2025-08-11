/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewOffersRequestAmqpDto, OfferAmqpDto, OfferMessagePatterns } from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OffersService } from './offers.service';

@Controller()
export class OffersController {
  constructor(private readonly offerService: OffersService) {}

  @MessagePattern(OfferMessagePatterns.READ_ALL)
  async findAll(): Promise<OfferAmqpDto[]> {
    return this.offerService.findAll();
  }

  @MessagePattern(OfferMessagePatterns.READ_BY_ORDER_ID)
  async findAllByOrderId(@Payload() orderId: string): Promise<OfferAmqpDto[]> {
    return this.offerService.findAllByOrderId(orderId);
  }

  @MessagePattern(OfferMessagePatterns.CREATE)
  async generateNewOffersForOrder(@Payload() request: NewOffersRequestAmqpDto): Promise<OfferAmqpDto[]> {
    return this.offerService.generateNewOffersForOrder(request);
  }

  @MessagePattern(OfferMessagePatterns.DECLINE_ALL_OF_ORDER)
  async declineOffersByOrderId(@Payload() orderId: string): Promise<boolean> {
    return this.offerService.declineAllOffers(orderId);
  }

  @MessagePattern(OfferMessagePatterns.READ_BY_ID)
  async findOne(@Payload() offerId: string): Promise<OfferAmqpDto> {
    return this.offerService.findOne(offerId);
  }

  @MessagePattern(OfferMessagePatterns.ACCEPT_BY_ID)
  async acceptOffer(@Payload() offerId: string): Promise<OfferAmqpDto> {
    return this.offerService.accept(offerId);
  }
}
