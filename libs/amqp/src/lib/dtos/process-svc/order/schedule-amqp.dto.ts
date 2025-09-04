import { ScheduleMachineAssignmentAmqpDto } from './schedule-machine-assignment-amqp.dto';

export class ScheduleAmqpDto {
  machineAssignment: ScheduleMachineAssignmentAmqpDto[];
  orderId: string;
  price: number;
  constructor(machineAssignment: ScheduleMachineAssignmentAmqpDto[], orderId: string, price: number) {
    this.machineAssignment = machineAssignment;
    this.orderId = orderId;
    this.price = price;
  }
}
