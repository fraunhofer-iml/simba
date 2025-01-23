export class MachineAssignmentAmqpDto {
  orderId: string;
  machineId: string;
  start: Date;
  end: Date;

  constructor(orderId: string, machineId: string, start: Date, end: Date) {
    this.orderId = orderId;
    this.machineId = machineId;
    this.start = start;
    this.end = end;
  }
}
