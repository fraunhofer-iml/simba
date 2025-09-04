import { ScheduleMachineAssignmentAmqpDto } from '@ap3/amqp';

export class ScheduleMachineAssignmentDto {
  machineId: string;
  start: string;
  end: string;

  constructor(machineId: string, start: string, end: string) {
    this.machineId = machineId;
    this.start = start;
    this.end = end;
  }

  public static fromAMQPDtos(amqpDtos: ScheduleMachineAssignmentAmqpDto[]): ScheduleMachineAssignmentDto[] {
    const scheduleMachineAssignmentDtos = [];

    for (const amqpDto of amqpDtos) {
      scheduleMachineAssignmentDtos.push(new ScheduleMachineAssignmentDto(amqpDto.machineId, amqpDto.start, amqpDto.end));
    }
    return scheduleMachineAssignmentDtos;
  }
}
