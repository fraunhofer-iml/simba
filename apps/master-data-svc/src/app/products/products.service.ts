/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {Injectable, Logger} from '@nestjs/common';
import {ProductPrismaService} from "@ap3/database";
import {ProductAmqpDto} from "@ap3/amqp";
import {Product} from "@prisma/client";
import * as util from "node:util";

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly productPrismaService: ProductPrismaService) {
  }

  async findAll(): Promise<ProductAmqpDto[]> {
    this.logger.debug(`Return all products from database`);
    try{
      const productsDtos: ProductAmqpDto[] = [];
      const products: Product[] = await this.productPrismaService.getProducts();
      products.forEach((product) => {
        productsDtos.push(ProductAmqpDto.fromPrismaEntity(product));
      })
      return productsDtos;
    }catch (e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findOne(id: string): Promise<ProductAmqpDto> {
    this.logger.debug(`Return a #${id} product`);
    try{
      const product: Product = await this.productPrismaService.getProduct(id);
      return ProductAmqpDto.fromPrismaEntity(product);
    }catch (e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
