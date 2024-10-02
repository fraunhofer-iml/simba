import { TradeReceivableDto } from 'libs/api/src/dtos/trade-receivable';
import { TradeReceivable } from '@prisma/client';

export class TradeReceivableAmqpDto {
  id: string;
  debitorId: string;
  nft: string;
  value: number;
  orderId: string;
  status: string;
  invoiceId: string;

  public static fromPrismaEntity(tradereceivable: TradeReceivable): TradeReceivableAmqpDto {
    return <TradeReceivableAmqpDto>{
      id: tradereceivable.id,
      debitorId: tradereceivable.debitorId,
      nft: tradereceivable.nft,
      value: tradereceivable.value,
      orderId: tradereceivable.orderId,
      status: tradereceivable.status,
      invoiceId: tradereceivable.invoiceId,
    };
  }

  public static toTradeReceivableDto(dto: TradeReceivableAmqpDto): TradeReceivableDto {
    return new TradeReceivableDto(dto.id, dto.debitorId, dto.nft, dto.value, dto.orderId, dto.status, dto.invoiceId);
  }
}
