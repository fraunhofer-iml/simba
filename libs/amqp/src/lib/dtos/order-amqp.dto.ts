import { OfferDto } from 'libs/api/src/dtos/offer';
import { OrderOverviewDto } from 'libs/api/src/dtos/order';
import { ProductDto } from 'libs/api/src/dtos/product';

export class OrderAmqpDto {
  id: string;
  productId: string;
  amount: number;
  dueMonth: string;
  creationDate: string;
  status: string;
  acceptedOfferId: string;
  offerIds: string[];
  robots: string[];
  customerId: string;
  tradeReceivableId: string;

  public static fromPrismaEntity(order: any): OrderAmqpDto {
    return <OrderAmqpDto>{
      id: order.id,
      creationDate: order.creationDate.toISOString(),
      amount: order.amount,
      status: order.status,
      dueMonth: order.dueMonth,
      productId: order.productId,
      robots: order.machines,
      customerId: order.participantId,
      acceptedOfferId: order.acceptedByOrderId,
      offerIds: order.offers,
      tradeReceivableId: order.tradeReceivableId,
    };
  }

  public static toOrderOverviewDto(dto: OrderAmqpDto, productDto: ProductDto, offerDto: OfferDto): OrderOverviewDto {
    return new OrderOverviewDto(
      dto.id,
      productDto,
      dto.amount,
      dto.dueMonth,
      dto.creationDate,
      dto.status,
      offerDto ? offerDto.price : 0,
      dto.robots,
      dto.customerId
    );
  }
}
