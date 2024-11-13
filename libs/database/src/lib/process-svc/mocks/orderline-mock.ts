import { Order, OrderLine, Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { OrdersSeed, ProductsSeed } from '../../../seed';

export const orderLinemock = <(OrderLine & { order: Order } & { item: Product })[]>[
  {
    id: 'cm35p7fwt000008mg5bb43j4g',
    netPrice: new Decimal(1),
    partialDeliveryAllowed: true,
    requestedQuantity: new Decimal(4),
    unitOfMeasureCodeAgreed: '',
    unitOfMeasureCodeRequested: '',
    lineTotalAmount: new Decimal(5),
    orderId: OrdersSeed[0].id,
    order: OrdersSeed[0],
    itemId: ProductsSeed[0].id,
    item: ProductsSeed[0],
  },
  {
    id: 'cm35p7lsv000108mgbav6go00',
    netPrice: new Decimal(1),
    partialDeliveryAllowed: true,
    requestedQuantity: new Decimal(4),
    unitOfMeasureCodeAgreed: '',
    unitOfMeasureCodeRequested: '',
    lineTotalAmount: new Decimal(5),
    orderId: OrdersSeed[1].id,
    order: OrdersSeed[1],
    itemId: ProductsSeed[0].id,
    item: ProductsSeed[0],
  },
];
