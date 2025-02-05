import { PaymentStatesSeed } from '@ap3/database';
import { InvoiceIdAndPaymentStateAmqpDto } from '../invoice-id-payment-state.dto';

export const InvoiceAndPaymentStatusDtoAmqpMock: InvoiceIdAndPaymentStateAmqpDto[] = [
  new InvoiceIdAndPaymentStateAmqpDto(PaymentStatesSeed[0].tradeReceivableId, PaymentStatesSeed[0].status),
  new InvoiceIdAndPaymentStateAmqpDto(PaymentStatesSeed[1].tradeReceivableId, PaymentStatesSeed[1].status),
];
