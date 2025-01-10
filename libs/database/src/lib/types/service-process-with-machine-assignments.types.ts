import { Machine, ServiceProcess } from '@prisma/client';

export type ServiceProcessWithMachineAssignmentsTypes = ServiceProcess & {
  machineAssignments: {
    machine: Machine;
  }[];
};
