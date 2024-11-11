export class PaymentStatusAmqpDto {
  status: string;
  timestamp: Date;

  constructor(status: string, timestamp: Date) {
    this.status = status;
    this.timestamp = timestamp;
  }
}
