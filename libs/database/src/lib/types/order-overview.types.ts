import { OrderStatus, Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type OrderOverview = { id: string; documentIssueDate: Date } & { states: OrderStatus[] } & { orderLines: { item: Product }[] } & {
  serviceProcess: {
    dueCalendarWeek: number;
    dueYear: number;
    machines: string[];
    offers: {
      id: string;
    }[];
    acceptedOffer: {
      id: string;
      price: Decimal;
    } | null;
    invoice: {
      tradeReceivable: {
        id: string;
      }[];
    } | null;
  } | null;
} & {
  buyer: {
    id: string;
    name: string;
  };
} & {
  seller: {
    id: string;
    name: string;
  };
};
