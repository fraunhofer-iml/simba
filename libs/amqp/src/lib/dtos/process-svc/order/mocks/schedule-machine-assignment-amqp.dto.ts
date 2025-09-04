import { machineAssignmentSeed } from '@ap3/database';
import { ScheduleMachineAssignmentAmqpDto } from '../schedule-machine-assignment-amqp.dto';

export const scheduleMachineAssignmentAmqpDtoMock: ScheduleMachineAssignmentAmqpDto[] = [
  new ScheduleMachineAssignmentAmqpDto(
    machineAssignmentSeed[0].machineId,
    machineAssignmentSeed[0].start.toISOString(),
    machineAssignmentSeed[0].end.toISOString()
  ),
];
