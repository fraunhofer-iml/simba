import { Prisma } from '@prisma/client';
import { OrdersSeed } from '../../../../../seed/orders.seed';

export const findLatestServiceStatusQuery = <Prisma.ServiceStatusFindFirstArgs[]>[
  {
    where: {
      serviceProcess: {
        orderId: OrdersSeed[0].id,
      },
    },
    include: {
      serviceProcess: {
        select: {
          orderId: true,
        },
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
  },
  {
    where: {
      serviceProcess: {
        orderId: OrdersSeed[1].id,
      },
    },
    include: {
      serviceProcess: {
        select: {
          orderId: true,
        },
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
  },
];
