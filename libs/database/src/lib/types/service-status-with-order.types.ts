import { ServiceStatus } from '@prisma/client';

export type ServiceStatusWithOrderTypes = ServiceStatus & {
  serviceProcess: {
    orderId: string | null;
  };
};
