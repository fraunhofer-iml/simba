import { machineAssignmentSeed } from '@ap3/database';
import { ScheduledMachineAssignmentDto } from '../scheduled-machine-assignment.dto';

export const scheduledMachineAssignmentDtoMock: ScheduledMachineAssignmentDto[] = [
  new ScheduledMachineAssignmentDto(
    machineAssignmentSeed[0].machineId,
    machineAssignmentSeed[0].start.toISOString(),
    machineAssignmentSeed[0].end.toISOString()
  ),
];
