import { ServiceProcess } from '@prisma/client';
import { OrdersSeed } from './orders.seed';

export const ServiceProcessesSeed = <ServiceProcess[]>[
  {
    id: 'sp001',
    dueCalendarWeek: 50,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-09T07:55:55.695Z'),
    orderId: OrdersSeed[0].id,
    acceptedOfferId: null,
  },
  {
    id: 'sp002',
    dueCalendarWeek: 10,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    orderId: OrdersSeed[1].id,
    acceptedOfferId: null,
  },
  {
    id: 'sp003',
    dueCalendarWeek: 35,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    orderId: OrdersSeed[2].id,
    acceptedOfferId: null,
  },

  {
    id: 'sp004',
    dueCalendarWeek: 40,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    orderId: OrdersSeed[3].id,
    acceptedOfferId: null,
  },
  {
    id: 'sp005',
    dueCalendarWeek: 50,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    orderId: OrdersSeed[4].id,
    acceptedOfferId: null,
  },
  {
    id: 'sp006',
    dueCalendarWeek: 44,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    orderId: OrdersSeed[5].id,
    acceptedOfferId: null,
  },
  {
    id: 'sp007',
    dueCalendarWeek: 22,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    orderId: OrdersSeed[6].id,
    acceptedOfferId: null,
  },
  {
    id: 'sp008',
    dueCalendarWeek: 11,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    orderId: OrdersSeed[7].id,
    acceptedOfferId: null,
  },
];
