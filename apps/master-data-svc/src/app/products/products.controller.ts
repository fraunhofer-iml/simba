/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import {ProductAmqpDto, ProductMessagePatterns} from "@ap3/amqp";

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(ProductMessagePatterns.READ_ALL)
  async findAll(): Promise<ProductAmqpDto[]> {
    return await this.productsService.findAll();
  }

  @MessagePattern(ProductMessagePatterns.READ_BY_ID)
  async findOne(@Payload() id: string): Promise<ProductAmqpDto> {
    return await this.productsService.findOne(id);
  }
}
