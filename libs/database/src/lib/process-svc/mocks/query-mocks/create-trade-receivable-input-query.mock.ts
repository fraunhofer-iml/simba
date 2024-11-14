import { PaymentStatesEnum } from '@ap3/config';
import { Prisma } from '@prisma/client';
import { InvoiceSeed } from '../../../../seed/invoices.seed';

export const createTradeReceivablePrismaInputMock: Prisma.TradeReceivableCreateInput = <Prisma.TradeReceivableCreateInput>{
  nft: '',
  invoice: { connect: { id: InvoiceSeed[0].id } },
  states: { create: { status: PaymentStatesEnum.OPEN, timestamp: new Date() } },
};
