import { PaymentStates } from '@ap3/util';

export class AdditionalDataDto {
  serviceProcessId: string;
  serviceProcessHash: string;
  status: PaymentStates;

  constructor(serviceProcessId: string, serviceProcessHash: string, status: PaymentStates) {
    this.serviceProcessId = serviceProcessId;
    this.serviceProcessHash = serviceProcessHash;
    this.status = status;
  }
}
