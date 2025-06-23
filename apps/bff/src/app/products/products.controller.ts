/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthRolesEnum, ProductDto } from '@ap3/api';
import { Roles } from 'nest-keycloak-connect';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get all available products.' })
  @ApiResponse({ type: [ProductDto] })
  async findAll(): Promise<ProductDto[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get a product based on the corresponding product id.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the product.',
    required: true,
  })
  @ApiResponse({ type: ProductDto })
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productsService.findOne(id);
  }
}
