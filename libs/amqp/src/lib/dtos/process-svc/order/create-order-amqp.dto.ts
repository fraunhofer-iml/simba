import { PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { OrderAmqpDto } from '../../order-amqp.dto';

export class CreateOrderAmqpDto extends PickType(OrderAmqpDto, ['productId', 'amount', 'year', 'calendarWeek', 'customerId']) {
  vatCurrency: string;
  buyerId: string;
  sellerId: string;

  constructor(vatCurrency: string, buyerId: string, sellerId: string) {
    super(), (this.vatCurrency = vatCurrency);
    this.buyerId = buyerId;
    this.sellerId = sellerId;
  }

  public toPrismaCreateEntity(): Prisma.OrderCreateInput {
    return <Prisma.OrderCreateInput>{
      totalAmountWithoutVat: null,
      vatCurrency: this.vatCurrency,
      buyer: { connect: { id: this.buyerId } },
      seller: { connect: { id: this.sellerId } },
      serviceProcess: {
        create: { dueCalendarWeek: this.calendarWeek, dueYear: this.year },
      },
      orderLines: {
        create: {
          requestedQuantity: this.amount,
          item: {
            connect: {
              id: this.productId,
            },
          },
        },
      },
    };
  }
}
