/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductPrismaService {
  private logger = new Logger(ProductPrismaService.name);

  constructor(private prisma: PrismaService) {}

  async getProduct(id: string): Promise<Product | null> {
    this.logger.debug(`Return product by id ${id} from database`);
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: id },
      });
      if (!product) {
        throw new NotFoundException(`Product with id ${id} was not found in database.`);
      }
      return product;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getProducts(): Promise<Product[]> {
    this.logger.debug(`Return all products from database`);
    return this.prisma.product.findMany({});
  }
}
