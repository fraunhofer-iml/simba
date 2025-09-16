import { ScheduleMachineAssignmentAmqpDto } from './schedule-machine-assignment-amqp.dto';

export class ScheduleAmqpDto {
  machineAssignment: ScheduleMachineAssignmentAmqpDto[];
  orderId: string;
  buyerOrderRefDocumentId: string;
  price: number;
  constructor(machineAssignment: ScheduleMachineAssignmentAmqpDto[], orderId: string, buyerOrderRefDocumentId: string, price: number) {
    this.machineAssignment = machineAssignment;
    this.orderId = orderId;
    this.buyerOrderRefDocumentId = buyerOrderRefDocumentId;
    this.price = price;
  }
}
