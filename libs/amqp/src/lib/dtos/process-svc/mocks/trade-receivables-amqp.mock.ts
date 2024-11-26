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
    invoiceNumber: InvoiceSeed[0].invoiceNumber,
    invoiceDueDate: InvoiceSeed[0].dueDate,
  },
  {
    id: TradeReceivablesSeed[1].id,
    debtorId: InvoiceSeed[1].debtorId,
    creditorId: InvoiceSeed[1].creditorId,
    nft: TradeReceivablesSeed[1].nft,
    totalAmountWithoutVat: +InvoiceSeed[1].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(PaymentStatesSeed[3].status, PaymentStatesSeed[3].timestamp),
    invoiceNumber: InvoiceSeed[1].invoiceNumber,
    invoiceDueDate: InvoiceSeed[1].dueDate,
  },
];
