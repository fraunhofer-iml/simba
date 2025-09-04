import { offersSeed, ordersSeed } from '@ap3/database';
import { ScheduleDto } from '../schedule.dto';
import { scheduleMachineAssignmentDtoMock } from './schedule-machine-assignments.mock';

export const schedulingMock: ScheduleDto[] = [
  new ScheduleDto(scheduleMachineAssignmentDtoMock, ordersSeed[0].id, Number(offersSeed[0].basicPrice)),
];
