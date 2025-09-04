import { machineAssignmentSeed } from '@ap3/database';
import { ScheduleMachineAssignmentDto } from '../schedule-machine-assignments.dto';

export const scheduleMachineAssignmentDtoMock: ScheduleMachineAssignmentDto[] = [
  new ScheduleMachineAssignmentDto(
    machineAssignmentSeed[0].machineId,
    machineAssignmentSeed[0].start.toISOString(),
    machineAssignmentSeed[0].end.toISOString()
  ),
];
