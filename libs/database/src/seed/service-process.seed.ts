import { ServiceProcess } from '@prisma/client';

export const ServiceProcessesSeed = <ServiceProcess[]>[
  {
    id: 'sp001',
    dueCalendarWeek: 50,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-09T07:55:55.695Z'),
    machines: ['rt001', 'rt003'],
    orderId: 'o001',
    acceptedOfferId: null,
  },
  {
    id: 'sp002',
    dueCalendarWeek: 52,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    machines: ['rt001', 'rt002'],
    orderId: 'o002',
    acceptedOfferId: null,
  },
  {
    id: 'sp003',
    dueCalendarWeek: 52,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    machines: ['rt001', 'rt002'],
    orderId: 'o003',
    acceptedOfferId: null,
  },
];
