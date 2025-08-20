import { ordersSeed } from '@ap3/database';
import { CreateInvoiceDto } from '../create-invoice.dto';

export const createInvoiceMock: CreateInvoiceDto = <CreateInvoiceDto>{
  orderId: ordersSeed[0].id,
};
