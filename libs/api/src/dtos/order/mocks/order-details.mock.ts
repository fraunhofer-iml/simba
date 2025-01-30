import { GetMachineAssignmentsDtoMock } from '../../service-process';
import { ProcessStateHistoryMock } from '../../service-process/mocks/process-state-history.mock';
import { OrderDetailsDto } from '../order-details.dto';
import { OrderOverviewMock } from './order-overview.mock';

export const OrderDetailsMock = <OrderDetailsDto[]>[
  {
    order: OrderOverviewMock[0],
    processStateHistory: [ProcessStateHistoryMock[0], ProcessStateHistoryMock[1]],
    machineAssignments: [GetMachineAssignmentsDtoMock[0], GetMachineAssignmentsDtoMock[1]],
  },
  {
    order: OrderOverviewMock[1],
    processStateHistory: [ProcessStateHistoryMock[2]],
    machineAssignments: [GetMachineAssignmentsDtoMock[2]],
  },
];
