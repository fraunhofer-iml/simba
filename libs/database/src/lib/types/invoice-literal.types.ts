import { Decimal } from '@prisma/client/runtime/library';

export type InvoiceIdTypes = { id: string };

export type InvoiceSumTotalAmountWithoutVatTypes = { _sum: { totalAmountWithoutVat: Decimal } };

export type InvoiceCountAndDueMonth = { invoice_count: number, due_month: string };
