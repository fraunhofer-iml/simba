/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Controller, Param, Put, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthRolesEnum, TradeReceivableDto } from '@ap3/api';
import { UserRoles } from '@ap3/util';
import { Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Put(':id/finish')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Indicates that production is complete and creates an invoice and a trade receivable.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  finish(@Request() req: any, @Param('id') id: string): Promise<TradeReceivableDto>  {
    const companyId = req.user.realm_access.roles.includes(UserRoles.ADMIN) ? '' : req.user.company;
    return this.ordersService.create(id, companyId);
  }
}
