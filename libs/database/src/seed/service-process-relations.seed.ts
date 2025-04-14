import { Prisma } from '@prisma/client';

export const ServiceProcessesRelationSeed = <Prisma.ServiceProcessUpdateManyArgs[]>[
  {
    where: { id: 'sp001' },
    data: { acceptedOfferId: 'of001' },
  },
];
