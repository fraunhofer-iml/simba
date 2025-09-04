export class ScheduleMachineAssignmentAmqpDto {
  machineId: string;
  start: string;
  end: string;

  constructor(machineId: string, start: string, end: string) {
    this.machineId = machineId;
    this.start = start;
    this.end = end;
  }
  
}
