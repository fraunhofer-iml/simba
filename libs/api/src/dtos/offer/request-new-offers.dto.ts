import { NewOffersRequestAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class RequestNewOffersDto {
  @ApiProperty({ description: 'An id to uniquely identify the corresponding Order' })
  orderId: string;
  @ApiProperty({ description: 'The starting calendar week for the offer generation. ', minimum: 1, maximum: 53 })
  cw: number;
  @ApiProperty({ description: 'The year of the offer generation. ' })
  year: number;

  constructor(orderId: string, cw: number, year: number) {
    this.orderId = orderId;
    this.cw = cw;
    this.year = year;
  }

  public static toAmqpDto(request: RequestNewOffersDto): NewOffersRequestAmqpDto {
    return new NewOffersRequestAmqpDto(request.orderId, request.cw, request.year);
  }
}
