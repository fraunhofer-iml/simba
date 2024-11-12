import { ServiceStatesEnum } from '@ap3/config';
import { ServiceStatus } from '@prisma/client';

export const serviceStatusMock = <ServiceStatus[]>[
  { serviceProcessId: 'cm2uiedwn000108miftzcf209', status: ServiceStatesEnum.PLANNED, timestamp: new Date('2024-11-05T14:58:51.652Z') },
  { serviceProcessId: 'cm2uiedwn000108miftzcf209', status: ServiceStatesEnum.OPEN, timestamp: new Date('2024-11-05T14:58:50.652Z') },
];
