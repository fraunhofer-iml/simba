import { PaymentStatus } from '@prisma/client';

export const PaymentStatesSeed = <PaymentStatus[]>[
  {
    tradeReceivableId: 'TR001',
    status: 'Open',
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: 'TR001',
    status: 'Financed',
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: 'TR002',
    status: 'Open',
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: 'TR002',
    status: 'Paid',
    timestamp: new Date('2024-10-12T07:55:55.695Z'),
  },
];
