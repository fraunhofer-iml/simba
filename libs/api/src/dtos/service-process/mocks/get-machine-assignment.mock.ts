import { GetMachineAssignmentDto } from '@ap3/api';
import { CompaniesSeed, MachineAssignmentSeed, OrdersSeed } from '@ap3/database';

export const GetMachineAssignmentsDtoMock = <GetMachineAssignmentDto[]>[
  {
    orderId: OrdersSeed[0].id,
    machineId: MachineAssignmentSeed[0].machineId,
    start: new Date(MachineAssignmentSeed[0].start),
    end: new Date(MachineAssignmentSeed[0].end),
    ownerId: CompaniesSeed[2].id,
    ownerName: CompaniesSeed[2].name,
  },
  {
    orderId: OrdersSeed[0].id,
    machineId: MachineAssignmentSeed[1].machineId,
    start: new Date(MachineAssignmentSeed[1].start),
    end: new Date(MachineAssignmentSeed[1].end),
    ownerId: CompaniesSeed[2].id,
    ownerName: CompaniesSeed[2].name,
  },
  {
    orderId: OrdersSeed[2].id,
    machineId: MachineAssignmentSeed[2].machineId,
    start: new Date(MachineAssignmentSeed[2].start),
    end: new Date(MachineAssignmentSeed[2].end),
    ownerId: CompaniesSeed[2].id,
    ownerName: CompaniesSeed[2].name,
  },
];
