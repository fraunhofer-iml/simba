/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import util from 'node:util';
import {
  CreateOfferAmqpDto,
  CreateOrderAmqpDto,
  NewOffersRequestAmqpDto,
  OfferAmqpDto,
  OrderAmqpDto,
  ScheduleAmqpDto,
  ServiceStatusAmqpDto,
} from '@ap3/amqp';
import { OfferPrismaService, OrderDatabaseAdapterService, OrderWithDependencies, ServiceProcessPrismaService } from '@ap3/database';
import { OfferStatesEnum, ServiceStatesEnum } from '@ap3/util';
import { Injectable, Logger } from '@nestjs/common';
import { Offer, Order, Prisma } from '@prisma/client';
import { ServiceProcessService } from '../../service-process/service-process.service';
import { OrderSchedulingHandlerService } from './order-scheduling-handler.service';

@Injectable()
export class OrderManagementService {
  private readonly logger = new Logger(OrderManagementService.name);

  constructor(
    private readonly orderDatabaseAdapterService: OrderDatabaseAdapterService,
    private readonly offerPrismaService: OfferPrismaService,
    private readonly serviceProcessService: ServiceProcessService,
    private readonly serviceProcessPrismaService: ServiceProcessPrismaService,
    private readonly orderSchedulingHandlerService: OrderSchedulingHandlerService
  ) {}

  async create(createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    this.logger.debug(`Create order: ${util.inspect(createOrderDto)}`);
    const createOrderEntity: Prisma.OrderCreateInput = createOrderDto.toPrismaCreateEntity();
    const newOrder: Order = await this.orderDatabaseAdapterService.createOrder(createOrderEntity);
    try {
      await this.serviceProcessService.updateServiceStatus(newOrder.id, ServiceStatesEnum.OPEN);

      const offers: CreateOfferAmqpDto[] = await this.orderSchedulingHandlerService.scheduleOrder(
        newOrder.id,
        newOrder.buyerOrderRefDocumentId,
        createOrderDto.requestedCalendarWeek,
        createOrderDto.requestedYear,
        createOrderDto.productId,
        createOrderDto.quantity
      );
      await this.createOffers(offers);

      const orderOverview: OrderWithDependencies = await this.orderDatabaseAdapterService.getOrder(newOrder.id);
      const currentState: ServiceStatusAmqpDto = OrderAmqpDto.getLatestState(orderOverview.serviceProcess.states);

      return OrderAmqpDto.fromPrismaEntity(orderOverview, currentState);
    } catch (e) {
      this.logger.error(`Couldn't reach cpps to scheduler order #${newOrder.id}`);
      await this.cancelOrder(newOrder.id);
      throw e;
    }
  }

  async generateNewOffersForOrder(request: NewOffersRequestAmqpDto): Promise<OfferAmqpDto[]> {
    const offers: CreateOfferAmqpDto[] = await this.orderSchedulingHandlerService.generateNewOffersForOrder(request);
    return await this.createOffers(offers);
  }

  async accept(offerId: string): Promise<OfferAmqpDto> {
    this.logger.debug(`Accepting offer #${offerId} for order`);
    const offer: Offer = await this.offerPrismaService.setOfferState(offerId, OfferStatesEnum.ACCEPTED);
    const orderIdOfOffer: string = (await this.serviceProcessPrismaService.setServiceProcessAcceptedOffer(offer.serviceProcessId, offer.id))
      .orderId;
    try {
      const notAcceptedOffers: Offer[] = await this.offerPrismaService.getOffersByOrderId(orderIdOfOffer, [
        OfferStatesEnum.OPEN.toString(),
      ]);
      await this.declineOffers(notAcceptedOffers);

      const order = await this.orderDatabaseAdapterService.getOrder(orderIdOfOffer);
      await this.orderSchedulingHandlerService.acceptScheduling(orderIdOfOffer, offer, order);
      await this.serviceProcessPrismaService.setServiceState(orderIdOfOffer, ServiceStatesEnum.PLANNED);

      return OfferAmqpDto.fromPrismaEntity(offer, orderIdOfOffer);
    } catch (e) {
      this.logger.error(`Couldn't reach cpps scheduler to accept offer for order #${orderIdOfOffer}`);
      await this.cancelOrder(orderIdOfOffer);
      throw e;
    }
  }

  async declineOffers(offers: Offer[]): Promise<void> {
    if (offers && offers.length > 0) {
      for (const offer of offers) {
        await this.offerPrismaService.setOfferState(offer.id, OfferStatesEnum.REFUSED);
      }
    } else {
      this.logger.warn(`No offers found for order`);
    }
  }

  async cancelOrder(orderId: string): Promise<boolean> {
    const offers: Offer[] = await this.offerPrismaService.getOffersByOrderId(orderId);
    if (offers) {
      await this.declineOffers(await this.offerPrismaService.getOffersByOrderId(orderId));
    }
    return !!(await this.serviceProcessPrismaService.setServiceState(orderId, ServiceStatesEnum.CANCELED));
  }

  async finishOrder(orderId: string): Promise<boolean> {
    try {
      return !!(await this.serviceProcessPrismaService.setServiceState(orderId, ServiceStatesEnum.PRODUCED));
    } catch (e) {
      this.logger.error(`Couldn't create a PRODUCED state for order: ${orderId}`);
      return false;
    }
  }

  async getScheduling(): Promise<ScheduleAmqpDto[]> {
    return await this.orderSchedulingHandlerService.getScheduling();
  }

  private async createOffers(offers: CreateOfferAmqpDto[]): Promise<OfferAmqpDto[]> {
    const createdOffers: OfferAmqpDto[] = [];
    for (const offer of offers) {
      const created: Offer = await this.offerPrismaService.createOffer(offer.toPrismaEntity());
      createdOffers.push(OfferAmqpDto.fromPrismaEntity(created, offer.orderId));
    }
    return createdOffers;
  }
}
