import { ServiceStatesSeed } from '@ap3/database';
import { ServiceStatusAmqpDto } from '../index';

export const ServiceStatusAmqpDtoMock: ServiceStatusAmqpDto[] = [
  new ServiceStatusAmqpDto(ServiceStatesSeed[0].status, ServiceStatesSeed[0].timestamp.toISOString()),
  new ServiceStatusAmqpDto(ServiceStatesSeed[1].status, ServiceStatesSeed[1].timestamp.toISOString()),
];
