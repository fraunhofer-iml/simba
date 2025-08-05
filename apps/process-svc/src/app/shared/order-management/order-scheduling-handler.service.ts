/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateOfferAmqpDto } from '@ap3/amqp';
import {
  AcceptScheduledOfferDto,
  CppsSchedulerConnectorService,
  ScheduledProductDto,
  ScheduleOrderRequestDto,
  ScheduleOrderResponseDto,
} from '@ap3/cpps-scheduler-connector';
import { OrderWithDependencies } from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';
import { Offer } from '@prisma/client';

@Injectable()
export class OrderSchedulingHandlerService {
  private readonly logger = new Logger(OrderSchedulingHandlerService.name);

  constructor(private readonly cppsSchedulerConnector: CppsSchedulerConnectorService) {}

  async scheduleOrder(
    orderId: string,
    calendarWeek: number,
    year: number,
    productId: string,
    quantity: number
  ): Promise<CreateOfferAmqpDto[]> {
    const product = new ScheduledProductDto(productId, quantity);
    const orderToSchedule = new ScheduleOrderRequestDto(orderId, calendarWeek, year, new Date(), [product]);
    const scheduledOrder: ScheduleOrderResponseDto = await this.cppsSchedulerConnector.scheduleOrder(orderToSchedule);
    const createOffers: CreateOfferAmqpDto[] = [];
    for (const cwPrice of scheduledOrder.pricesPerCW) {
      const offer = new CreateOfferAmqpDto();
      offer.orderId = orderId;
      offer.basicPrice = cwPrice.basePrice;
      offer.utilization = cwPrice.utilization;
      offer.timeToProduction = cwPrice.timeUntilProduction;
      offer.plannedCalendarWeek = cwPrice.cw;
      offer.plannedYear = cwPrice.year;
      createOffers.push(offer);
    }

    return createOffers;
  }

  async acceptScheduling(orderId: string, offer: Offer, order: OrderWithDependencies): Promise<void> {
    const scheduledProduct = new ScheduledProductDto(order.orderLines[0].item.id, Number(order.orderLines[0].requestedQuantity));
    const acceptRequest = new AcceptScheduledOfferDto(Number(offer.plannedCalendarWeek), Number(offer.plannedYear), scheduledProduct);

    await this.cppsSchedulerConnector.acceptOffer(orderId, acceptRequest);
  }
}
