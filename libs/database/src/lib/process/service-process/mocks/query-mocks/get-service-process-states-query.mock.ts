import { Prisma } from '@prisma/client';

export const GetServiceProcessStatesQueryMock = <Prisma.ServiceStatusFindManyArgs>{
  where: { serviceProcess: { orderId: String('o001') } },
  include: {
    serviceProcess: { select: { orderId: true } },
  },
};
