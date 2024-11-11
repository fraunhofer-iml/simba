import { Product } from '@prisma/client';

export const ProductsSeed = <Product[]>[
  {
    id: 'prod1',
    name: 'Quadrocopter',
    variant: 'V001',
  },
];
