import {OrderAmqpDto} from "../../order-amqp.dto";
import {Prisma} from "@prisma/client";
import {OrderStatesEnum} from "@ap3/config";
import {PickType} from "@nestjs/swagger";

export class CreateOrderAmqpDto extends PickType(OrderAmqpDto, ['productId', 'amount','dueMonth', 'customerId']) {
  public toPrismaCreateEntity(): Prisma.OrderCreateInput{
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
