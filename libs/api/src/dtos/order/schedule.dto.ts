import { ScheduleAmqpDto, ScheduleMachineAssignmentAmqpDto } from '@ap3/amqp';
import { ScheduleMachineAssignmentDto } from './schedule-machine-assignments.dto';

export class ScheduleDto {
  machineAssignments: ScheduleMachineAssignmentAmqpDto[];
  orderId: string;
  buyerOrderRefDocumentId: string;
  productName: string;
  amount: number;
  price: number;
  constructor(
    machineAssignments: ScheduleMachineAssignmentAmqpDto[],
    orderId: string,
    buyerOrderRefDocumentId: string,
    productName: string,
    amount: number,
    price: number
  ) {
    this.machineAssignments = machineAssignments;
    this.orderId = orderId;
    this.buyerOrderRefDocumentId = buyerOrderRefDocumentId;
    this.productName = productName;
    this.amount = amount;
    this.price = price;
  }

  public static toScheduleDto(amqpDto: ScheduleAmqpDto, amount: number, productName: string) {
    return new ScheduleDto(
      ScheduleMachineAssignmentDto.fromAMQPDtos(amqpDto.machineAssignment),
      amqpDto.orderId,
      amqpDto.buyerOrderRefDocumentId,
      productName,
      amount,
      amqpDto.price
    );
  }
}
