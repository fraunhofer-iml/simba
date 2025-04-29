/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllOrdersFilterAmqpDto } from '@ap3/amqp';
import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { OrderPrismaService, OrderWithDependencies } from './order';

@Injectable()
export class OrderDatabaseAdapterService {
  constructor(private readonly orderPrismaService: OrderPrismaService) {}

  async getOrder(id: string): Promise<OrderWithDependencies | null> {
    const order = await this.orderPrismaService.getOrdersWithDependencies({ orderId: id });
    return order && order.length == 1 ? order[0] : null;
  }

  async getOrders(params: AllOrdersFilterAmqpDto): Promise<OrderWithDependencies[] | null> {
    return await this.orderPrismaService.getOrdersWithDependencies({
      buyerId: params.companyId,
      sellerId: params.companyId,
      machineOwnerId: params.companyId,
      buyerName: params.customerName,
      serviceStates: params.serviceStates,
      productionDateTo: params.productionDateTo,
      productionDateFrom: params.productionDateFrom,
    });
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.orderPrismaService.createOrder(data);
  }

  async deleteOrder(id: string): Promise<Order> {
    return this.orderPrismaService.deleteOrder(id);
  }
}
