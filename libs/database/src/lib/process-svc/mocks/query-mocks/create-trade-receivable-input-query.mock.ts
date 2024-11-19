import { Prisma } from '@prisma/client';
import { InvoiceSeed } from '../../../../seed/invoices.seed';
import { PaymentStatesEnum } from '../../../constants';

export const createTradeReceivablePrismaInputMock: Prisma.TradeReceivableCreateInput = <Prisma.TradeReceivableCreateInput>{
  nft: '',
  invoice: { connect: { id: InvoiceSeed[0].id } },
  states: { create: { status: PaymentStatesEnum.OPEN, timestamp: new Date() } },
};
