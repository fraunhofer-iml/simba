import { PaymentStatesEnum } from '@ap3/config';
import { Prisma } from '@prisma/client';

export const createTradeReceivableQuery = <Prisma.TradeReceivableCreateInput>{
  nft: 'testnfthash',
  invoice: { connect: { id: 'IV001' } },
  states: { create: { status: PaymentStatesEnum.OPEN, timestamp: new Date('2024-08-16T10:09:41.295Z') } },
};

export const QueryTradeReceivablesByDebtorQuery = {
  where: {
    invoice: {
      debtor: {
        id: {
          equals: 'pt0001',
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

export const QueryTradeReceivablesByCreditorQuery = {
  where: {
    invoice: {
      creditor: {
        id: {
          equals: 'pt0002',
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

export const QueryTradeReceivablesByOrderQuery = {
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

export const QueryTradeReceivableById = {
  where: { id: 'TR001' },
  include: {
    states: true,
  },
};
