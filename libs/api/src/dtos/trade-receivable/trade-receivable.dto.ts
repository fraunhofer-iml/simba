import { TradeReceivable } from '@prisma/client';

export class TradeReceivableDto {
  id: string;
  debtorId: string;
  nft: string;
  value: number;
  orderId: string;
  status: string;
  invoiceId: string;

  constructor(id: string, debtorId: string, nft: string, value: number, orderId: string, status: string, invoiceId: string) {
    this.id = id;
    this.debtorId = debtorId;
    this.nft = nft;
    this.value = value;
    this.orderId = orderId;
    this.status = status;
    this.invoiceId = invoiceId;
  }

  public static fromPrismaEntity(tradereceivable: TradeReceivable) {
    return new TradeReceivableDto(
      tradereceivable.id,
      tradereceivable.debitorId,
      tradereceivable.nft,
      tradereceivable.value,
      tradereceivable.orderId,
      tradereceivable.status,
      tradereceivable.invoiceId
    );
  }
}
