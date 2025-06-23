/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {Product} from "@prisma/client";

export class ProductAmqpDto{
  id: string;
  name: string;
  variant: string;

  constructor(id: string, name: string, variant: string) {
    this.id = id;
    this.name = name;
    this.variant = variant;
  }

  public static fromPrismaEntity(product: Product): ProductAmqpDto{
    return <ProductAmqpDto>{
      id: product.id,
      name: product.name,
      variant: product.variant
    }
  }
}
