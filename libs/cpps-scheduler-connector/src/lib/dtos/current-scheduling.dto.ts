import { ScheduledMachineAssignmentDto } from './scheduled-machine-assignment.dto';

export class CurrentSchedulingDto {
  orderId: string;
  price: number;
  machineAssignment: ScheduledMachineAssignmentDto[];

  constructor(orderId: string, price: number, machineAssignment: ScheduledMachineAssignmentDto[]) {
    this.orderId = orderId;
    this.price = price;
    this.machineAssignment = machineAssignment;
  }
}
