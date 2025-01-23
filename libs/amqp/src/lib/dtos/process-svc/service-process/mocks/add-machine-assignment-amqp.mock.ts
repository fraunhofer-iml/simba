import { MachineAssignmentAmqpDto } from '@ap3/amqp';
import { MachineAssignmentSeed, OrdersSeed } from '@ap3/database';

export const MachineAssignmentAMQPMock = <MachineAssignmentAmqpDto[]>[
  {
    orderId: OrdersSeed[0].id,
    machineId: MachineAssignmentSeed[0].machineId,
    start: new Date(MachineAssignmentSeed[0].start),
    end: new Date(MachineAssignmentSeed[0].end),
  },
  {
    orderId: OrdersSeed[0].id,
    machineId: MachineAssignmentSeed[1].machineId,
    start: new Date(MachineAssignmentSeed[1].start),
    end: new Date(MachineAssignmentSeed[1].end),
  },
  {
    orderId: OrdersSeed[2].id,
    machineId: MachineAssignmentSeed[2].machineId,
    start: new Date(MachineAssignmentSeed[2].start),
    end: new Date(MachineAssignmentSeed[2].end),
  },
];
