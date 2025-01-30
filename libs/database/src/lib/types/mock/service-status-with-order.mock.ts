import { ServiceProcessesSeed, ServiceStatesSeed } from '../../../seed';
import { ServiceStatusWithOrderTypes } from '../service-status-with-order.types';

export const ServiceStatusWithOrderMock = <ServiceStatusWithOrderTypes[]>[
  {
    ...ServiceStatesSeed[0],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
  },
  {
    ...ServiceStatesSeed[1],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
  },
  {
    ...ServiceStatesSeed[2],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
  },
];
