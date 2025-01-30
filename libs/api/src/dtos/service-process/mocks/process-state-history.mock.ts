import { ServiceProcessStatesAmqpMock } from '@ap3/amqp';
import { ServiceProcessStatusDto } from '@ap3/api';

export const ProcessStateHistoryMock = <ServiceProcessStatusDto[]>[
  { ...ServiceProcessStatesAmqpMock[0] },
  { ...ServiceProcessStatesAmqpMock[1] },
  { ...ServiceProcessStatesAmqpMock[2] },
];
