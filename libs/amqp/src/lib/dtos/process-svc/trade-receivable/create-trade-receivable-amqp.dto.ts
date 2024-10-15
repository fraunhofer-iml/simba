import {OmitType} from "@nestjs/swagger";
import {Prisma} from "@prisma/client";
import {TradeReceivableStatesEnum} from "@ap3/config";
import {TradeReceivableAmqpDto} from "../../trade-receivable-amqp.dto";

export class CreateTradeReceivableAmqpDto extends OmitType(TradeReceivableAmqpDto, ["id"] as const){
  public toPrismaCreateEntity(): Prisma.TradeReceivableCreateInput{
    return <Prisma.TradeReceivableCreateInput>{
      nft: this.nft,
      debtor: { connect: { id: this.debtorId }},
      value: this.value,
      creationDate: new Date(),
      order: { connect: { id: this.orderId }},
      status: TradeReceivableStatesEnum.OPEN,
      invoice: { connect: { invoiceNumber: this.invoiceId }}
    }
  }
}
