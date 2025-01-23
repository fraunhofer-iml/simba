import { MachineAssignmentAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class MachineAssignmentDto {
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  machineId: string;
  @ApiProperty()
  start: Date;
  @ApiProperty()
  end: Date;

  constructor(orderId: string, machineId: string, start: Date, end: Date) {
    this.orderId = orderId;
    this.machineId = machineId;
    this.start = start;
    this.end = end;
  }

  public toAMQPDto(): MachineAssignmentAmqpDto {
    return new MachineAssignmentAmqpDto(this.orderId, this.machineId, this.start, this.end);
  }
}
