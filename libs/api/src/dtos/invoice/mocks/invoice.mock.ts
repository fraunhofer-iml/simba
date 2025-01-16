import { CompaniesSeed, InvoiceSeed, PaymentStatesSeed } from '@ap3/database';
import { InvoiceDto } from '../invoice.dto';

export const InvoiceMocks: InvoiceDto[] = [
  new InvoiceDto(
    InvoiceSeed[0].id,
    InvoiceSeed[0].invoiceNumber,
    CompaniesSeed[1].id,
    CompaniesSeed[1].name,
    +InvoiceSeed[0].totalAmountWithoutVat,
    InvoiceSeed[0].dueDate.toISOString(),
    CompaniesSeed[0].id,
    CompaniesSeed[0].name,
    PaymentStatesSeed[1].status,
    process.env['OBJECT_STORAGE_URL'] + InvoiceSeed[0].url,
    InvoiceSeed[0].contractCurrency
  ),
  new InvoiceDto(
    InvoiceSeed[1].id,
    InvoiceSeed[1].invoiceNumber,
    CompaniesSeed[1].id,
    CompaniesSeed[1].name,
    +InvoiceSeed[1].totalAmountWithoutVat,
    InvoiceSeed[1].dueDate.toISOString(),
    CompaniesSeed[0].id,
    CompaniesSeed[0].name,
    PaymentStatesSeed[3].status,
    process.env['OBJECT_STORAGE_URL'] + InvoiceSeed[1].url,
    InvoiceSeed[1].contractCurrency
  ),
];
