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
];
