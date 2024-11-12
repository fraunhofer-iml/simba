import { Prisma } from '@prisma/client';

export const findLatestServiceStatusQuery = <Prisma.ServiceStatusFindFirstArgs[]>[
  {
    where: {
      serviceProcess: {
        orderId: 'cm2uiedwn000108miftzcf209',
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
        orderId: 'cm2uiild9000108mnf080gcp7',
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
