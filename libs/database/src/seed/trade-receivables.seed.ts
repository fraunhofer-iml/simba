import { TradeReceivable } from '@prisma/client';
import { InvoiceSeed } from './invoices.seed';

export const TradeReceivablesSeed = <TradeReceivable[]>[
  {
    id: 'TR001',
    nft: 'AEF3122355213EFA1',
    invoiceId: InvoiceSeed[0].id,
  },
  {
    id: 'TR002',
    nft: 'AEF3122355213EFA2',
    invoiceId: InvoiceSeed[1].id,
  },
];
