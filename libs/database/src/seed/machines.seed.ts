import { Prisma } from '@prisma/client'; 
 export const machinesSeed = [
  {
    id: 'rt001',
    cppsId: 'cpps1',
    description: 'test robot 1',
    minimalPrice: new Prisma.Decimal(1.3),
    companyId: 'pt0003'
  },
  {
    id: 'rt002',
    cppsId: 'cpps2',
    description: 'test robot 2',
    minimalPrice: new Prisma.Decimal(1.15),
    companyId: 'pt0003'
  },
  {
    id: 'rt003',
    cppsId: 'cpps3',
    description: 'test robot 3',
    minimalPrice: new Prisma.Decimal(1.45),
    companyId: 'pt0003'
  },
  {
    id: 'rt004',
    cppsId: 'cpps4',
    description: 'test robot 4',
    minimalPrice: new Prisma.Decimal(1.2),
    companyId: 'pt0003'
  },
  {
    id: 'rt005',
    cppsId: 'cpps5',
    description: 'test robot 5',
    minimalPrice: new Prisma.Decimal(1.25),
    companyId: 'pt0004'
  },
  {
    id: 'rt006',
    cppsId: 'cpps6',
    description: 'test robot 6',
    minimalPrice: new Prisma.Decimal(1.45),
    companyId: 'pt0004'
  },
  {
    id: 'rt007',
    cppsId: 'cpps7',
    description: 'test robot 7',
    minimalPrice: new Prisma.Decimal(1.5),
    companyId: 'pt0004'
  },
  {
    id: 'rt008',
    cppsId: 'cpps8',
    description: 'test robot 8',
    minimalPrice: new Prisma.Decimal(1.1),
    companyId: 'pt0004'
  },
  {
    id: 'rt009',
    cppsId: 'cpps9',
    description: 'test robot 9',
    minimalPrice: new Prisma.Decimal(1.15),
    companyId: 'pt0003'
  }
]