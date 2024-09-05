import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { OrderMessagePatterns } from '@ap3/amqp';
import { CreateOrderDto } from '@ap3/api';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(OrderMessagePatterns.CREATE)
  async create(@Payload() createOrderDto: CreateOrderDto): Promise<any> {
    return await this.ordersService.create(createOrderDto);
  }

  @MessagePattern(OrderMessagePatterns.READ_ALL)
  async findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern(OrderMessagePatterns.READ_BY_ID)
  async findOne(@Payload() id: number) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern(OrderMessagePatterns.REMOVE_ORDER_BY_ID)
  async remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }
}
