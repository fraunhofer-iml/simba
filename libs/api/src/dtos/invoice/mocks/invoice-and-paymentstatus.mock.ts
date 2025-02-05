import { PaymentStatesSeed } from '@ap3/database';
import { InvoiceIdAndPaymentStateDto } from '../invoice-id-and-payment-state';

export const InvoiceAndPaymentStatusDtoMock: InvoiceIdAndPaymentStateDto[] = [
  new InvoiceIdAndPaymentStateDto(PaymentStatesSeed[0].tradeReceivableId, PaymentStatesSeed[0].status),
  new InvoiceIdAndPaymentStateDto(PaymentStatesSeed[1].tradeReceivableId, PaymentStatesSeed[1].status),
];
