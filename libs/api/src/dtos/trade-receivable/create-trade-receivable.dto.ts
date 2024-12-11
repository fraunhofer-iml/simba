import { CreateTradeReceivableAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTradeReceivableDto {
  @ApiProperty()
  nft: string;
  @ApiProperty()
  invoiceId: string;
  @ApiProperty({ type: Date })
  statusTimestamp: Date;

  constructor(nft: string, invoiceId: string, statusTimestamp: Date) {
    this.nft = nft;
    this.invoiceId = invoiceId;
    this.statusTimestamp = statusTimestamp;
  }

  public toCreateTradeReceivableAmqpDto(): CreateTradeReceivableAmqpDto {
    return new CreateTradeReceivableAmqpDto(this.statusTimestamp, this.nft, this.invoiceId);
  }
}
