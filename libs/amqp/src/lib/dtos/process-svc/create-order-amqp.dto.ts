import {PickType} from "@nestjs/swagger";
import {OrderAmqpDto} from "../order-amqp.dto";
import {CreateOrderDto} from "@ap3/api";
import {Prisma} from "@prisma/client";
import {OrderStatesEnum} from "@ap3/config";

export class CreateOrderAmqpDto extends PickType(OrderAmqpDto, ['productId', 'amount','dueMonth', 'customerId']) {
  static fromFEDto(createOrder: CreateOrderDto): CreateOrderAmqpDto{
    return <CreateOrderAmqpDto>{
      productId: createOrder.productId,
      amount: createOrder.amount,
      dueMonth: createOrder.dueMonth,
      customerId: createOrder.customerId,
    }
  }

  public toPrismaEntity(): Prisma.OrderCreateInput{
    return <Prisma.OrderCreateInput>{
      creationDate: new Date().toISOString(),
      amount: this.amount,
      status: OrderStatesEnum.NEW,
      dueMonth: this.dueMonth,
      product: { connect: { id: this.productId }},
      customer: { connect: { id: this.customerId }}
    }
  }
}
