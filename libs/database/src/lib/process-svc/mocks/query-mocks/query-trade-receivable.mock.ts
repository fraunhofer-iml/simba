import { Prisma } from '@prisma/client';
import { CompaniesSeed, InvoiceSeed, OrdersSeed, PaymentStatesSeed, TradeReceivablesSeed } from '../../../../seed';
import { PaymentStatesEnum } from '../../../constants';

export const createTradeReceivableQuery = <Prisma.TradeReceivableCreateInput>{
  nft: TradeReceivablesSeed[0].nft,
  invoice: { connect: { id: InvoiceSeed[0].id } },
  states: { create: { status: PaymentStatesEnum.OPEN, timestamp: PaymentStatesSeed[3].timestamp } },
};

const trQueryInclude = <Prisma.TradeReceivableInclude>{
  serviceProcess: {
    select: {
      orderId: true,
    },
  },
  tradeReceivable: {
    select: {
      id: true,
      nft: true,
    },
  },
};

export const InvoicesByDebtorQueryMock = {
  where: {
    OR: [{ debtorId: InvoiceSeed[0].debtorId }],
  },
  include: trQueryInclude,
};

export const InvoicesByCreditorQueryMock = {
  where: {
    OR: [{ creditorId: InvoiceSeed[0].creditorId }],
  },
  include: trQueryInclude,
};

export const InvoicesByOrderQueryMock = {
  where: {
    OR: [{ creditorId: InvoiceSeed[0].debtorId }, { debtorId: InvoiceSeed[0].debtorId }],
    AND: [{ serviceProcess: { orderId: OrdersSeed[0].id } }],
  },
  include: trQueryInclude,
};

export const InvoiceIdQueryMock = {
  where: {
    OR: [{ creditorId: InvoiceSeed[0].debtorId }, { debtorId: InvoiceSeed[0].debtorId }],
    AND: [{ id: { in: [InvoiceSeed[0].id] } }],
  },
  include: trQueryInclude,
};
