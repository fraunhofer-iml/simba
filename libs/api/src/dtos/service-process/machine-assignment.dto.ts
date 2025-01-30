import { MachineAssignmentAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class MachineAssignmentDto {
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  machineId: string;
  @ApiProperty({
    type: String,
    example: '2025-04-05T14:30:00Z',
    description: 'Timestamp in ISO 8601 format',
  })
  start: Date;
  @ApiProperty({
    type: String,
    example: '2025-04-05T14:30:00Z',
    description: 'Timestamp in ISO 8601 format',
  })
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
