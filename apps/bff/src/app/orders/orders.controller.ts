/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthRolesEnum, CreateOrderDto, OrderDetailsDto, OrderOverviewDto } from '@ap3/api';
import { Roles } from 'nest-keycloak-connect';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER] })
  @ApiOperation({
    description:
      'Creates an order and an corresponding process service, stores both entities in the database and transfers the order to the CPPS scheduler.',
  })
  @ApiBody({
    type: CreateOrderDto,
    required: true,
  })
  @ApiResponse({ type: OrderOverviewDto })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderOverviewDto> {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get all active orders.' })
  @ApiQuery({
    name: 'companyId',
    type: String,
  })
  @ApiResponse({ type: [OrderOverviewDto] })
  async findAll(@Query('companyId') companyId: string): Promise<OrderOverviewDto[]> {
    return await this.ordersService.findAll(companyId);
  }

  @Get(':id')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({
    description: 'Get an order based on the corresponding order id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  @ApiResponse({ type: OrderOverviewDto })
  async findOne(@Param('id') id: string): Promise<OrderOverviewDto> {
    return await this.ordersService.findOne(id);
  }

  @Get(':id/details')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({
    description: 'Get an order based on the corresponding order id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  @ApiResponse({ type: OrderDetailsDto })
  async findOneDetails(@Param('id') id: string): Promise<OrderDetailsDto> {
    return await this.ordersService.findOneDetails(id);
  }

  @Delete(':id')
  @Roles({ roles: [AuthRolesEnum.ADMIN] })
  @ApiOperation({
    description: 'Delete an order based on the corresponding order id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  async deleteOne(@Param('id') id: string): Promise<void> {
    await this.ordersService.deleteOne(id);
  }
}
