import { Prisma } from '@prisma/client';

export const GetMachineAssignmentsQueryMock = <Prisma.MachineAssignmentFindManyArgs>{
  where: { serviceProcess: { orderId: String('o001') } },
  include: {
    serviceProcess: { select: { orderId: true } },
    machine: {
      select: {
        company: { select: { id: true, name: true } },
      },
    },
  },
};
