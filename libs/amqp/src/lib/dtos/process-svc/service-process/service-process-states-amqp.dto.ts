import { ServiceStatusWithOrderTypes } from '@ap3/database';

export class ServiceProcessStatusAmqpDto {
  orderId: string;
  status: string;
  timestamp: Date;

  constructor(orderId: string, status: string, timestamp: Date) {
    this.orderId = orderId;
    this.status = status;
    this.timestamp = timestamp;
  }

  public static fromPrismaEntity(state: ServiceStatusWithOrderTypes) {
    return new ServiceProcessStatusAmqpDto(state.serviceProcess.orderId ? state.serviceProcess.orderId : '', state.status, state.timestamp);
  }
}
