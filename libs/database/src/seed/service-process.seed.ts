import { ServiceProcess } from '@prisma/client';
import { MachinesSeed } from './machines.seed';
import { OrdersSeed } from './orders.seed';

export const ServiceProcessesSeed = <ServiceProcess[]>[
  {
    id: 'sp001',
    dueCalendarWeek: 50,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-09T07:55:55.695Z'),
    machines: [MachinesSeed[0].id, MachinesSeed[1].id],
    orderId: OrdersSeed[0].id,
    acceptedOfferId: null,
  },
  {
    id: 'sp002',
    dueCalendarWeek: 10,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    machines: [MachinesSeed[0].id, MachinesSeed[1].id],
    orderId: OrdersSeed[1].id,
    acceptedOfferId: null,
  },
  {
    id: 'sp003',
    dueCalendarWeek: 35,
    dueYear: 2024,
    scheduledDate: new Date('2024-10-02T07:55:55.695Z'),
    machines: [MachinesSeed[1].description, MachinesSeed[2]],
    orderId: OrdersSeed[2].id,
    acceptedOfferId: null,
  },
];
