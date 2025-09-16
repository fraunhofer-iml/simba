import { offersSeed, ordersSeed } from '@ap3/database';
import { CurrentSchedulingDto } from '../current-scheduling.dto';
import { scheduledMachineAssignmentDtoMock } from './schedule-machine-assignment-dto.mock';

export const currentSchedulingDtoMock: CurrentSchedulingDto = new CurrentSchedulingDto(
  ordersSeed[0].id,
  ordersSeed[0].buyerOrderRefDocumentId,
  Number(offersSeed[0].basicPrice),
  scheduledMachineAssignmentDtoMock
);
