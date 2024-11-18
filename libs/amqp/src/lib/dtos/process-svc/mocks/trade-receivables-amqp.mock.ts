import { InvoiceSeed, PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { CreateTradeReceivableAmqpDto } from '../trade-receivable/create-trade-receivable-amqp.dto';
import { PaymentStatusAmqpDto } from '../trade-receivable/payment-status-amqp.dto';
import { TradeReceivableAmqpDto } from '../trade-receivable/trade-receivable-amqp.dto';

export const CreateTradeReceivableAMQPMock = new CreateTradeReceivableAmqpDto(
  PaymentStatesSeed[3].timestamp,
  TradeReceivablesSeed[0].nft,
  TradeReceivablesSeed[0].invoiceId
);

export const TradeReceivablesAMQPMock = <TradeReceivableAmqpDto[]>[
  {
    id: TradeReceivablesSeed[0].id,
    debtorId: InvoiceSeed[0].debtorId,
    creditorId: InvoiceSeed[0].creditorId,
    nft: TradeReceivablesSeed[0].nft,
    totalAmountWithoutVat: +InvoiceSeed[0].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(PaymentStatesSeed[1].status, PaymentStatesSeed[1].timestamp),
    invoiceId: TradeReceivablesSeed[0].invoiceId,
    creationDate: InvoiceSeed[0].creationDate,
  },
  {
    id: TradeReceivablesSeed[1].id,
    debtorId: InvoiceSeed[1].debtorId,
    creditorId: InvoiceSeed[1].creditorId,
    nft: TradeReceivablesSeed[1].nft,
    totalAmountWithoutVat: +InvoiceSeed[1].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(PaymentStatesSeed[3].status, PaymentStatesSeed[3].timestamp),
    invoiceId: TradeReceivablesSeed[1].invoiceId,
    creationDate: InvoiceSeed[1].creationDate,
  },
];
