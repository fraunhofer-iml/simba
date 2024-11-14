import { ServiceStatus } from '@prisma/client';

export const ServiceStatesSeed = <ServiceStatus[]>[
  {
    serviceProcessId: 'sp001',
    status: 'Open',
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: 'Planned',
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: 'Scheduled',
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: 'Produced',
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: 'Open',
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: 'Planned',
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: 'Scheduled',
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: 'Produced',
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: 'Open',
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: 'Planned',
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
];
