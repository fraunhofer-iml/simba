import { InvoiceSeed, PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { PaymentStatusAmqpDto } from '../../trade-receivable';
import { InvoiceAmqpDto } from '../invoice-amqp.dto';

export const InvoicesAmqpMock = <InvoiceAmqpDto[]>[
  {
    id: InvoiceSeed[0].id,
    debtorId: InvoiceSeed[0].debtorId,
    creditorId: InvoiceSeed[0].creditorId,
    nft: TradeReceivablesSeed[0].nft,
    totalAmountWithoutVat: +InvoiceSeed[0].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(PaymentStatesSeed[1].status, PaymentStatesSeed[1].timestamp),
    invoiceNumber: InvoiceSeed[0].invoiceNumber,
    invoiceDueDate: InvoiceSeed[0].dueDate,
    url: process.env['OBJECT_STORAGE_URL'] + InvoiceSeed[0].url,
  },
  {
    id: InvoiceSeed[1].id,
    debtorId: InvoiceSeed[1].debtorId,
    creditorId: InvoiceSeed[1].creditorId,
    nft: TradeReceivablesSeed[1].nft,
    totalAmountWithoutVat: +InvoiceSeed[1].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(PaymentStatesSeed[3].status, PaymentStatesSeed[3].timestamp),
    invoiceNumber: InvoiceSeed[1].invoiceNumber,
    invoiceDueDate: InvoiceSeed[1].dueDate,
    url: process.env['OBJECT_STORAGE_URL'] + InvoiceSeed[1].url,
  },
];
