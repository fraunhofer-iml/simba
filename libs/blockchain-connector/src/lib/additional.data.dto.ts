import { PaymentStatesEnum } from '@ap3/database';

export class AdditionalDataDto {
  serviceProcessId: string;
  serviceProcessHash: string;
  status: PaymentStatesEnum;

  constructor(serviceProcessId: string, serviceProcessHash: string, status: PaymentStatesEnum) {
    this.serviceProcessId = serviceProcessId;
    this.serviceProcessHash = serviceProcessHash;
    this.status = status;
  }
}
