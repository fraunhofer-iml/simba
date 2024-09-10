import {PickType} from "@nestjs/swagger";
import {OfferAmqpDto} from "../../offer-amqp.dto";
import {Prisma} from "@prisma/client";
import {OfferStatesEnum} from "@ap3/config";

export class CreateOfferAmqpDto extends PickType(OfferAmqpDto, [ 'price','status', 'orderId']) {

  public toPrismaEntity(): Prisma.OfferCreateInput {
    return <Prisma.OfferCreateInput>{
      creationDate: new Date().toISOString(),
      price: this.price,
      status: OfferStatesEnum.OPEN,
      order: { connect: { id: this.orderId }},
    }
  }
}
