import { Invoice } from '@prisma/client';

export type InvoiceWithNFT = Invoice & {
  serviceProcess: {
    orderId: string | null;
  } | null;
  tradeReceivable: {
    id: string;
    nft: string;
  } | null;
};
