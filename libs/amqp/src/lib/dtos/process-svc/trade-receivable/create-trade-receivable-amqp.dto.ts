import { PaymentStatesEnum } from '@ap3/config';
import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { TradeReceivableAmqpDto } from './trade-receivable-amqp.dto';

export class CreateTradeReceivableAmqpDto extends OmitType(TradeReceivableAmqpDto, [
  'id',
  'debtorId',
  'creditorId',
  'totalAmountWithoutVat',
  'status',
  'creationDate',
] as const) {
  statusTimestamp: Date;

  constructor(statusTimestamp: Date, nft: string, invoiceId: string) {
    super();
    this.nft = nft;
    this.invoiceId = invoiceId;
    this.statusTimestamp = statusTimestamp;
  }
  public toPrismaCreateEntity(): Prisma.TradeReceivableCreateInput {
    return <Prisma.TradeReceivableCreateInput>{
      nft: this.nft,
      invoice: { connect: { id: this.invoiceId } },
      states: { create: { status: PaymentStatesEnum.OPEN, timestamp: this.statusTimestamp } },
    };
  }
}
