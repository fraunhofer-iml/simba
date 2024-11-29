import { Prisma } from '@prisma/client';
import { CompaniesSeed, InvoiceSeed, PaymentStatesSeed, TradeReceivablesSeed } from '../../../../seed';
import { PaymentStatesEnum } from '../../../constants';

export const createTradeReceivableQuery = <Prisma.TradeReceivableCreateInput>{
  nft: TradeReceivablesSeed[0].nft,
  invoice: { connect: { id: InvoiceSeed[0].id } },
  states: { create: { status: PaymentStatesEnum.OPEN, timestamp: PaymentStatesSeed[3].timestamp } },
};

export const TradeReceivablesByDebtorQueryMock = {
  where: {
    invoice: {
      debtor: {
        id: {
          equals: CompaniesSeed[0].id,
        },
      },
    },
  },
  include: {
    invoice: {
      include: {
        debtor: true,
      },
    },
  },
};

export const TradeReceivablesByCreditorQueryMock = {
  where: {
    invoice: {
      creditor: {
        id: {
          equals: CompaniesSeed[1].id,
        },
      },
    },
  },
  include: {
    invoice: {
      include: {
        creditor: true,
      },
    },
  },
};

export const TradeReceivablesByOrderQueryMock = {
  include: {
    invoice: {
      include: {
        serviceProcess: {
          include: {
            order: {
              where: {
                id: {
                  equals: 'o001',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const TradeReceivableByIdQueryMock = {
  where: { id: TradeReceivablesSeed[0].id },
  include: {
    states: true,
  },
};

export const TradeReceivableByInvoiceIdQueryMock = {
  where: { invoiceId: InvoiceSeed[0].id }
};
