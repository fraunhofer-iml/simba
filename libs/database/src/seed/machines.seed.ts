import { Machine, Prisma } from '@prisma/client';

export const MachinesSeed = <Machine[]>[
  {
    id: 'rt001',
    cppsId: 'cpps1',
    description: 'test robot 1',
    minimalPrice: new Prisma.Decimal(1.3),
  },
  {
    id: 'rt002',
    cppsId: 'cpps2',
    description: 'test robot 2',
    minimalPrice: new Prisma.Decimal(1.15),
  },
  {
    id: 'rt003',
    cppsId: 'cpps3',
    description: 'test robot 3',
    minimalPrice: new Prisma.Decimal(1.45),
  },
];
