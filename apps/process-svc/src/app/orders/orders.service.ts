/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import { AllOrdersFilterAmqpDto, CreateOrderAmqpDto, OrderAmqpDto, ScheduleAmqpDto, ServiceStatusAmqpDto } from '@ap3/amqp';
import { OrderDatabaseAdapterService, OrderWithDependencies } from '@ap3/database';
import { SERVICE_STATES_TO_SHOW } from '@ap3/util';
import { Injectable, Logger } from '@nestjs/common';
import { Order } from '@prisma/client';
import { OrderManagementService } from '../shared/order-management/order-management.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly orderDatabaseAdapterService: OrderDatabaseAdapterService,
    private readonly orderManagementService: OrderManagementService
  ) {}

  async create(createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    return this.orderManagementService.create(createOrderDto);
  }

  async findAll(params: AllOrdersFilterAmqpDto): Promise<OrderAmqpDto[]> {
    const orderDtos: OrderAmqpDto[] = [];
    const serviceStatesToShow: string[] =
      params.serviceStates && params.serviceStates.length > 0 ? params.serviceStates : SERVICE_STATES_TO_SHOW;
    this.logger.debug(util.inspect(params));
    const orders: OrderWithDependencies[] = await this.orderDatabaseAdapterService.getOrders(params);
    for (const order of orders) {
      const latestServiceStatus: ServiceStatusAmqpDto = OrderAmqpDto.getLatestState(order.serviceProcess.states);
      if (serviceStatesToShow.includes(latestServiceStatus?.status)) {
        orderDtos.push(OrderAmqpDto.fromPrismaEntity(order, latestServiceStatus));
      }
    }
    return orderDtos;
  }

  async findOne(id: string): Promise<OrderAmqpDto> {
    this.logger.debug(id);
    const order: OrderWithDependencies = await this.orderDatabaseAdapterService.getOrder(id);
    const currentState: ServiceStatusAmqpDto = OrderAmqpDto.getLatestState(order.serviceProcess.states);
    return OrderAmqpDto.fromPrismaEntity(order, currentState);
  }

  async remove(id: string): Promise<boolean> {
    this.logger.debug(`Remove order with id: ${id}`);
    const deletedOrder: Order = await this.orderDatabaseAdapterService.deleteOrder(id);
    return !!deletedOrder;
  }

  async finishOrder(offerId: string): Promise<boolean> {
    return await this.orderManagementService.finishOrder(offerId);
  }

  async getScheduling(): Promise<ScheduleAmqpDto[]> {
    return await this.orderManagementService.getScheduling();
  }
}
