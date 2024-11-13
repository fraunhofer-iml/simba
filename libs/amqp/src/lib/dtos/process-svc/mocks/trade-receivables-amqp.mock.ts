import { CreateTradeReceivableAmqpDto } from '../trade-receivable/create-trade-receivable-amqp.dto';
import { PaymentStatusAmqpDto } from '../trade-receivable/payment-status-amqp.dto';
import { TradeReceivableAmqpDto } from '../trade-receivable/trade-receivable-amqp.dto';

export const CreateTradeReceivableAMQPMock = new CreateTradeReceivableAmqpDto(new Date('2024-08-16T10:09:41.295Z'), 'testnfthash', 'IV001');

export const TradeReceivablesAMQPMock = <TradeReceivableAmqpDto[]>[
  {
    id: 'TR001',
    debtorId: 'pt0001',
    creditorId: 'pt0002',
    nft: 'AEF3122355213EFA1',
    totalAmountWithoutVat: 3,
    status: new PaymentStatusAmqpDto('Financed', new Date('2024-10-13T07:55:55.695Z')),
    invoiceId: 'IV001',
    creationDate: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    id: 'TR002',
    nft: 'AEF3122355213EFA2',
    invoiceId: 'IV002',
    debtorId: 'pt0001',
    creditorId: 'pt0002',
    totalAmountWithoutVat: 6,
    status: new PaymentStatusAmqpDto('Paid', new Date('2024-10-12T07:55:55.695Z')),
    creationDate: new Date('2024-10-11T07:55:55.695Z'),
  },
];
