import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderDto, OrderMock } from '@ap3/api';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
  }

  findAll(): OrderDto[] {
    return OrderMock;
  }

  findOne(id: string): OrderDto {
    return OrderMock[0];
  }
}
