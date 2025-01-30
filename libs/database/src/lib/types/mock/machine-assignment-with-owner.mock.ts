import { CompaniesSeed, MachineAssignmentSeed, ServiceProcessesSeed } from '../../../seed';
import { MachineAssignmentWithOwner } from '../machine-assignment-with-owner.types';

export const MachineAssignmentWithOwnerMock = <MachineAssignmentWithOwner[]>[
  {
    ...MachineAssignmentSeed[0],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
    machine: {
      company: {
        id: CompaniesSeed[2].id,
        name: CompaniesSeed[2].name,
      },
    },
  },
  {
    ...MachineAssignmentSeed[1],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
    machine: {
      company: {
        id: CompaniesSeed[2].id,
        name: CompaniesSeed[2].name,
      },
    },
  },
  {
    ...MachineAssignmentSeed[2],
    serviceProcess: {
      orderId: ServiceProcessesSeed[1].orderId,
    },
    machine: {
      company: {
        id: CompaniesSeed[2].id,
        name: CompaniesSeed[2].name,
      },
    },
  },
];
