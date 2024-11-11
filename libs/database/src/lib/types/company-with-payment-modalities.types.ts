import { Company, PaymentInformation } from '@prisma/client';

export type CompanyWithPaymentModalitiesTypes = Company & {
  paymentInformation: PaymentInformation[];
};
