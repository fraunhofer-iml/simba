import { offersSeed, orderLinesSeed, ordersSeed, productsSeed } from '@ap3/database';
import { ScheduleDto } from '../schedule.dto';
import { scheduleMachineAssignmentDtoMock } from './schedule-machine-assignments.mock';

export const schedulingMock: ScheduleDto[] = [
  new ScheduleDto(
    scheduleMachineAssignmentDtoMock,
    ordersSeed[0].id,
    ordersSeed[0].buyerOrderRefDocumentId,
    productsSeed[0].name,
    Number(orderLinesSeed[0].requestedQuantity),
    Number(offersSeed[0].basicPrice)
  ),
];
