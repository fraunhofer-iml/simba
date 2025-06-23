/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllOrdersFilterAmqpDto } from '@ap3/amqp';
import { APIUtil, AuthRolesEnum, CreateOrderDto, KeycloakUser, OrderDetailsDto, OrderOverviewDto } from '@ap3/api';
import { ServiceStatesEnum } from '@ap3/util';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
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
  async create(@AuthenticatedUser() user: KeycloakUser, @Body() createOrderDto: CreateOrderDto): Promise<OrderOverviewDto> {
    if (user.company === createOrderDto.customerId) {
      return await this.ordersService.create(createOrderDto);
    } else {
      throw new HttpException("Forbidden: JWT user and customer id doesn't match", HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get all active orders.' })
  @ApiQuery({
    name: 'companyId',
    type: String,
    description: 'Orders are returned for companies with this id that are involved in the orders either as customers or service providers.',
    required: false,
  })
  @ApiQuery({
    name: 'customerName',
    type: String,
    description: 'Name of involved customer.',
    required: false,
  })
  @ApiQuery({
    name: 'productionDateFrom',
    type: Date,
    description: 'Start of a specific production date range. Has to be in ISO format (YYYY-MM-DDTHH:MM:SSZ)',
    required: false,
    example: '2024-09-20T07:55:55.695Z',
  })
  @ApiQuery({
    name: 'productionDateTo',
    type: Date,
    description: 'End of a specific production date range. Has to be in ISO format (YYYY-MM-DDTHH:MM:SSZ)',
    required: false,
    example: '2024-09-20T07:55:55.695Z',
  })
  @ApiQuery({
    name: 'serviceStates',
    type: String,
    enum: ServiceStatesEnum,
    description:
      'Current service status of orders. This query parameter can be used multiple times in the same request to select multiple PaymentStates',
    required: false,
    example: [ServiceStatesEnum.OPEN],
    isArray: true,
  })
  @ApiResponse({ type: [OrderOverviewDto] })
  async findAll(
    @AuthenticatedUser() user: KeycloakUser,
    @Query('companyId') companyId?: string,
    @Query('customerName') customerName?: string,
    @Query('productionDateFrom') productionDateFrom?: Date,
    @Query('productionDateTo') productionDateTo?: Date,
    @Query('serviceStates') serviceStates?: ServiceStatesEnum[]
  ): Promise<OrderOverviewDto[]> {
    if (!APIUtil.isAdminOrLoggedInCompany(user, companyId)) {
      companyId = user.company;
    }
    return await this.ordersService.findAll(
      new AllOrdersFilterAmqpDto(serviceStates, companyId, customerName, productionDateFrom, productionDateTo)
    );
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
