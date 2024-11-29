import { PaymentStatus } from '@prisma/client';

export class PaymentStatusAmqpDto {
  status: string;
  timestamp: Date;

  constructor(status: string, timestamp: Date) {
    this.status = status;
    this.timestamp = timestamp;
  }

  public static fromPrismaEntity(state: PaymentStatus): PaymentStatusAmqpDto {
    return new PaymentStatusAmqpDto(state.status, state.timestamp);
  }
}
