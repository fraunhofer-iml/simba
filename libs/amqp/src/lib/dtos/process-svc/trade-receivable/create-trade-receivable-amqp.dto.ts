import { PaymentStatesEnum } from '@ap3/config';
import { OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { TradeReceivableAmqpDto } from '../../trade-receivable-amqp.dto';

export class CreateTradeReceivableAmqpDto extends OmitType(TradeReceivableAmqpDto, ['id'] as const) {
  creationDate: Date;
  statusTimestamp: Date;

  constructor(creationDate: Date, statusTimestamp: Date) {
    super();
    this.creationDate = creationDate;
    this.statusTimestamp = statusTimestamp;
  }
  public toPrismaCreateEntity(): Prisma.TradeReceivableCreateInput {
    return <Prisma.TradeReceivableCreateInput>{
      nft: this.nft,
      debtor: { connect: { id: this.debtorId } },
      value: this.value,
      creationDate: this.creationDate,
      order: { connect: { id: this.orderId } },
      status: { create: { orderId: this.orderId, status: PaymentStatesEnum.OPEN, timestamp: this.statusTimestamp } },
      invoice: { connect: { id: this.invoiceId } },
    };
  }
}
