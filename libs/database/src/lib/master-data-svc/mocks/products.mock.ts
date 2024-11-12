import { Product } from '@prisma/client';

export const productsMock = <Product[]>[
  {
    id: 'prod1',
    name: 'Quadrocopter',
    variant: 'V001',
  },
  {
    id: 'prod2',
    name: 'Oktocopter',
    variant: 'V003',
  },
];
