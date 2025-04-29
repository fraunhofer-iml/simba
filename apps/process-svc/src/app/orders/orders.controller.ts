/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllOrdersFilterAmqpDto, CreateOrderAmqpDto, OrderAmqpDto, OrderMessagePatterns } from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(OrderMessagePatterns.CREATE)
  async create(@Payload() createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    return await this.ordersService.create(createOrderDto);
  }

  @MessagePattern(OrderMessagePatterns.READ_ALL)
  async findAll(@Payload() params: AllOrdersFilterAmqpDto): Promise<OrderAmqpDto[]> {
    return await this.ordersService.findAll(params);
  }

  @MessagePattern(OrderMessagePatterns.READ_BY_ID)
  async findOne(@Payload() id: string): Promise<OrderAmqpDto> {
    return await this.ordersService.findOne(id);
  }

  @MessagePattern(OrderMessagePatterns.REMOVE_ORDER_BY_ID)
  async remove(@Payload() id: string): Promise<boolean> {
    return await this.ordersService.remove(id);
  }

  @MessagePattern(OrderMessagePatterns.FINISH_BY_ID)
  async finishOrder(@Payload() offerId: string): Promise<boolean> {
    return this.ordersService.finishOrder(offerId);
  }
}
