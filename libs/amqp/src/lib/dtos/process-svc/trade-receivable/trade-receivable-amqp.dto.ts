import { PaymentStatus, TradeReceivable } from '@prisma/client';
import { PaymentStatusAmqpDto } from './payment-status-amqp.dto';

export class TradeReceivableAmqpDto {
  id: string;
  nft: string;
  status: PaymentStatusAmqpDto[];

  constructor(id: string, nft: string, states: PaymentStatusAmqpDto[]) {
    this.id = id;
    this.nft = nft;
    this.status = states;
  }
  public static fromPrismaEntity(tradeReceivable: TradeReceivable, states: PaymentStatus[]): TradeReceivableAmqpDto {
    const paymentStatesAMQP: PaymentStatusAmqpDto[] = [];
    for (const prismaState of states) {
      paymentStatesAMQP.push(PaymentStatusAmqpDto.fromPrismaEntity(prismaState));
    }
    return new TradeReceivableAmqpDto(tradeReceivable.id, tradeReceivable.nft, paymentStatesAMQP);
  }
}
