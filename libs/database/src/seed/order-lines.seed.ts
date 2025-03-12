/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderLine, Prisma } from '@prisma/client';
import { ProductsSeed } from './products.seed';

export const OrderLinesSeed = <OrderLine[]>[
  {
    id: 'ol001',
    netPrice: new Prisma.Decimal(3),
    orderId: 'o001',
    itemId: ProductsSeed[0].id,
    requestedQuantity: new Prisma.Decimal(2),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(3),
  },
  {
    id: 'ol002',
    netPrice: new Prisma.Decimal(3),
    orderId: 'o002',
    itemId: ProductsSeed[0].id,
    requestedQuantity: new Prisma.Decimal(4),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(6),
  },
  {
    id: 'ol003',
    netPrice: new Prisma.Decimal(3),
    orderId: 'o003',
    itemId: ProductsSeed[0].id,
    requestedQuantity: new Prisma.Decimal(4),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(6),
  },
  {
    id: 'ol004',
    netPrice: new Prisma.Decimal(2),
    orderId: 'o004',
    itemId: ProductsSeed[0].id,
    requestedQuantity: new Prisma.Decimal(2),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(4),
  },
  {
    id: 'ol005',
    netPrice: new Prisma.Decimal(2),
    orderId: 'o005',
    itemId: ProductsSeed[0].id,
    requestedQuantity: new Prisma.Decimal(5),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(8),
  },
  {
    id: 'ol006',
    netPrice: new Prisma.Decimal(2),
    orderId: 'o006',
    itemId: ProductsSeed[0].id,
    requestedQuantity: new Prisma.Decimal(10),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(2),
  },
  {
    id: 'ol007',
    netPrice: new Prisma.Decimal(2),
    orderId: 'o007',
    itemId: ProductsSeed[0].id,
    requestedQuantity: new Prisma.Decimal(6),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(12),
  },
  {
    id: 'ol008',
    netPrice: new Prisma.Decimal(2),
    orderId: 'o008',
    itemId: ProductsSeed[0].id,
    requestedQuantity: new Prisma.Decimal(8),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(8),
  },
];
