import { ServiceProcessStatusAmqpDto } from '@ap3/amqp';
import { ServiceProcessesSeed, ServiceStatesSeed } from '@ap3/database';

export const ServiceProcessStatesAmqpMock = <ServiceProcessStatusAmqpDto[]>[
  { orderId: ServiceProcessesSeed[0].orderId, status: ServiceStatesSeed[0].status, timestamp: ServiceStatesSeed[0].timestamp },
  {
    orderId: ServiceProcessesSeed[0].orderId,
    status: ServiceStatesSeed[1].status,
    timestamp: ServiceStatesSeed[1].timestamp,
  },
  {
    orderId: ServiceProcessesSeed[0].orderId,
    status: ServiceStatesSeed[2].status,
    timestamp: ServiceStatesSeed[2].timestamp,
  },
];
