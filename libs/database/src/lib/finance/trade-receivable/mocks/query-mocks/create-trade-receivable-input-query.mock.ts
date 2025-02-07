import { PaymentStates } from '@ap3/util';
import { Prisma } from '@prisma/client';
import { InvoiceSeed } from '../../../../../seed/invoices.seed';

export const createTradeReceivablePrismaInputMock: Prisma.TradeReceivableCreateInput = <Prisma.TradeReceivableCreateInput>{
  nft: '',
  invoice: { connect: { id: InvoiceSeed[0].id } },
  states: { create: { status: PaymentStates.OPEN, timestamp: new Date() } },
};
