/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmqpBrokerQueues, OfferAmqpDto, OfferMessagePatterns, OrderAmqpDto } from '@ap3/amqp';
import { OfferDto } from '@ap3/api';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OffersService {
  private readonly logger = new Logger(OffersService.name);

  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {}

  async findAll(orderId?: string): Promise<OfferDto[]> {
    let offers: OfferAmqpDto[] = [];
    if (orderId) {
      this.logger.debug(`Get offers filtered by order id ${orderId}`);
      offers = await firstValueFrom<OfferAmqpDto[]>(this.processAMQPClient.send(OfferMessagePatterns.READ_BY_ORDER_ID, orderId));
    } else {
      this.logger.debug(`Get all offers`);
      offers = await firstValueFrom<OfferAmqpDto[]>(this.processAMQPClient.send(OfferMessagePatterns.READ_ALL, {}));
    }
    return OfferDto.toOfferDtos(offers);
  }

  async findOneAndParse(offerId: string): Promise<OfferDto> {
    const offer = await firstValueFrom<OfferAmqpDto>(this.processAMQPClient.send(OfferMessagePatterns.READ_BY_ID, offerId));
    return OfferDto.toOfferDto(offer);
  }

  async acceptOffer(offerId: string): Promise<boolean> {
    return await firstValueFrom<boolean>(this.processAMQPClient.send(OfferMessagePatterns.ACCEPT_BY_ID, offerId));
  }

  async declineOffers(orderId: string): Promise<boolean> {
    this.logger.debug(`Order id ${orderId}`);
    return await firstValueFrom<boolean>(this.processAMQPClient.send(OfferMessagePatterns.DECLINE_ALL_OF_ORDER, orderId));
  }

  async loadAcceptedOfferRef(dto: OrderAmqpDto): Promise<OfferDto> {
    let acceptedOffer: OfferDto;
    if (dto.acceptedOfferId) {
      acceptedOffer = await this.findOneAndParse(dto.acceptedOfferId);
    }
    return acceptedOffer;
  }
}
