/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferAmqpDto } from '@ap3/amqp';
import { OfferPrismaService, ServiceProcessPrismaService } from '@ap3/database';
import { OFFER_STATES_TO_SHOW } from '@ap3/util';
import { Injectable, Logger } from '@nestjs/common';
import { Offer } from '@prisma/client';
import { OrderManagementService } from '../shared/order-management/order-management.service';

@Injectable()
export class OffersService {
  private readonly logger = new Logger(OffersService.name);
  constructor(
    private readonly offerPrismaService: OfferPrismaService,
    private readonly serviceProcessPrismaService: ServiceProcessPrismaService,
    private readonly orderManagementService: OrderManagementService
  ) {}

  async findAll(): Promise<OfferAmqpDto[]> {
    const offerDtos: OfferAmqpDto[] = [];
    const offers: Offer[] = await this.offerPrismaService.getOffers();
    const idsToQuery = offers.map((offer) => offer.serviceProcessId);
    const serviceProcesses = await this.serviceProcessPrismaService.getServiceProcessByIds(idsToQuery);
    for (const offer of offers) {
      offerDtos.push(OfferAmqpDto.fromPrismaEntity(offer, serviceProcesses.find((sp) => sp.id === offer.serviceProcessId).orderId));
    }
    return offerDtos;
  }

  async findAllByOrderId(orderId: string): Promise<OfferAmqpDto[]> {
    this.logger.debug(`Get offers filtered by order id ${orderId}`);
    const offerDtos: OfferAmqpDto[] = [];
    const offers: Offer[] = await this.offerPrismaService.getOffersByOrderId(orderId, OFFER_STATES_TO_SHOW);
    for (const offer of offers) {
      const serviceProcess = await this.serviceProcessPrismaService.getServiceProcessById(offer.serviceProcessId);
      offerDtos.push(OfferAmqpDto.fromPrismaEntity(offer, serviceProcess.orderId));
    }
    return offerDtos;
  }

  async findOne(id: string): Promise<OfferAmqpDto> {
    const offer: Offer = await this.offerPrismaService.getOffersById(id);
    const serviceProcess = await this.serviceProcessPrismaService.getServiceProcessById(offer.serviceProcessId);
    return OfferAmqpDto.fromPrismaEntity(offer, serviceProcess.orderId);
  }

  async accept(offerId: string): Promise<OfferAmqpDto> {
    return this.orderManagementService.accept(offerId);
  }

  async declineAllOffers(orderId: string): Promise<boolean> {
    this.logger.debug(`Declining offers for order #${orderId} and cancel order`);
    return this.orderManagementService.cancelOrder(orderId);
  }
}
