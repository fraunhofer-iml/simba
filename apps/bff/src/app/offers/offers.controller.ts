/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthRolesEnum, OfferDto } from '@ap3/api';
import { Roles } from 'nest-keycloak-connect';
import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OffersService } from './offers.service';

@Controller('offers')
@ApiTags('Offers')
@ApiBearerAuth()
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Get all active offers, can be filtered by order id.' })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Filter parameter; Only returns offers corresponding to given order id.',
    required: false,
  })
  @ApiResponse({ type: [OfferDto] })
  async findAll(@Query('orderId') orderId?: string): Promise<OfferDto[]> {
    return await this.offersService.findAll(orderId);
  }

  @Get(':id')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Get an offer based on the corresponding offer id.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  @ApiResponse({ type: OfferDto })
  async findOne(@Param('id') id: string): Promise<OfferDto> {
    return await this.offersService.findOneAndParse(id);
  }

  @Patch(':id/accept')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Accept an offer.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  async acceptOffer(@Param('id') id: string): Promise<void> {
    await this.offersService.acceptOffer(id);
  }

  @Patch('decline')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Decline all offers for a specific order' })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  async declineOffers(@Query('orderId') orderId: string): Promise<void> {
    await this.offersService.declineOffers(orderId);
  }
}
