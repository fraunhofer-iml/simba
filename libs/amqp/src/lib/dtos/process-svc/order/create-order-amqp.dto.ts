import { OrderStatesEnum } from '@ap3/config';
import { PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { OrderAmqpDto } from '../../order-amqp.dto';

export class CreateOrderAmqpDto extends PickType(OrderAmqpDto, ['productId', 'amount', 'year', 'calendarWeek', 'customerId']) {
  public toPrismaCreateEntity(): Prisma.OrderCreateInput {
    return <Prisma.OrderCreateInput>{
      creationDate: new Date().toISOString(),
      amount: this.amount,
      status: OrderStatesEnum.NEW,
      year: this.year,
      calendarWeek: this.calendarWeek,
      product: { connect: { id: this.productId } },
      customer: { connect: { id: this.customerId } },
    };
  }
}
