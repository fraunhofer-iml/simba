import { ScheduleAmqpDto, ScheduleMachineAssignmentAmqpDto } from '@ap3/amqp';
import { ScheduleMachineAssignmentDto } from './schedule-machine-assignments.dto';

export class ScheduleDto {
  machineAssignments: ScheduleMachineAssignmentAmqpDto[];
  orderId: string;
  price: number;
  constructor(machineAssignment: ScheduleMachineAssignmentAmqpDto[], orderId: string, price: number) {
    this.machineAssignments = machineAssignment;
    this.orderId = orderId;
    this.price = price;
  }

  public static toScheduleDtos(amqpDtos: ScheduleAmqpDto[]) {
    const transFormedDtos = [];
    for (const dto of amqpDtos) {
      transFormedDtos.push(this.toScheduleDto(dto));
    }
    return transFormedDtos;
  }

  public static toScheduleDto(amqpDto: ScheduleAmqpDto) {
    return new ScheduleDto(ScheduleMachineAssignmentDto.fromAMQPDtos(amqpDto.machineAssignment), amqpDto.orderId, amqpDto.price);
  }
}
