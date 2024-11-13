export class ServiceStatusAmqpDto {
  timestamp: string;
  status: string;

  constructor(status: string, timestamp: string) {
    this.status = status;
    this.timestamp = timestamp;
  }
}
