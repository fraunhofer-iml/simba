import { OfferStatesEnum } from '@ap3/util';
import { PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { OfferAmqpDto } from './offer-amqp.dto';

export class CreateOfferAmqpDto extends PickType(OfferAmqpDto, ['price', 'status', 'orderId']) {
  public toPrismaEntity(relatedOfferId: string): Prisma.OfferCreateInput {
    return <Prisma.OfferCreateInput>{
      creationDate: new Date(),
      price: this.price,
      status: OfferStatesEnum.OPEN,
      serviceProcess: {
        connect: {
          orderId: relatedOfferId,
        },
      },
    };
  }
}
