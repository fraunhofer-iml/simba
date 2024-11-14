import { Prisma } from '@prisma/client';

export const findLatestServiceStatusQuery = <Prisma.ServiceStatusFindFirstArgs[]>[
  {
    where: {
      serviceProcess: {
        orderId: 'o001',
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
        orderId: 'o002',
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
