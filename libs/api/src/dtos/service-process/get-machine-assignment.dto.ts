import { GetMachineAssignmentAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';
import { MachineAssignmentDto } from './machine-assignment.dto';

export class GetMachineAssignmentDto extends MachineAssignmentDto {
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  ownerName: string;

  constructor(orderId: string, machineId: string, start: Date, end: Date, ownerId: string, ownerName: string) {
    super(orderId, machineId, start, end);
    this.ownerId = ownerId;
    this.ownerName = ownerName;
  }

  public static fromAMQPDto(machineAssignment: GetMachineAssignmentAmqpDto): GetMachineAssignmentDto {
    return new GetMachineAssignmentDto(
      machineAssignment.orderId,
      machineAssignment.machineId,
      machineAssignment.start,
      machineAssignment.end,
      machineAssignment.ownerId,
      machineAssignment.ownerName
    );
  }

  public static fromAmqpDtos(machineAssignment: GetMachineAssignmentAmqpDto[]): GetMachineAssignmentDto[] {
    return machineAssignment.map((assignmentAMQP) => {
      return GetMachineAssignmentDto.fromAMQPDto(assignmentAMQP);
    });
  }
}
