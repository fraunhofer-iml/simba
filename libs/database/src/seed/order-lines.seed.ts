import { OrderLine, Prisma } from '@prisma/client';

export const OrderLinesSeed = <OrderLine[]>[
  {
    id: 'ol001',
    netPrice: new Prisma.Decimal(3),
    orderId: 'o001',
    itemId: 'prod1',
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
    itemId: 'prod1',
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
    itemId: 'prod1',
    requestedQuantity: new Prisma.Decimal(4),
    partialDeliveryAllowed: false,
    unitOfMeasureCodeRequested: null,
    unitOfMeasureCodeAgreed: null,
    lineTotalAmount: new Prisma.Decimal(6),
  },
];
