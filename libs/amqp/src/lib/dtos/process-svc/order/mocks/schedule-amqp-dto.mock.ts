import { scheduleMachineAssignmentAmqpDtoMock } from '.';
import { offersSeed, ordersSeed } from '@ap3/database';
import { ScheduleAmqpDto } from '../schedule-amqp.dto';

export const scheduleAmqpDtoMock: ScheduleAmqpDto = new ScheduleAmqpDto(
  scheduleMachineAssignmentAmqpDtoMock,
  ordersSeed[0].id,
  ordersSeed[0].buyerOrderRefDocumentId,
  Number(offersSeed[0].basicPrice)
);
