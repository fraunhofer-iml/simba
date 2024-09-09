import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import {CreateOrderAmqpDto, OrderAmqpDto, OrderMessagePatterns} from '@ap3/amqp';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(OrderMessagePatterns.CREATE)
  async create(@Payload() createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    return await this.ordersService.create(createOrderDto);
  }

  @MessagePattern(OrderMessagePatterns.READ_ALL)
  async findAll():Promise<OrderAmqpDto[]> {
    return await this.ordersService.findAll();
  }

  @MessagePattern(OrderMessagePatterns.READ_BY_ID)
  async findOne(@Payload() id: string): Promise<OrderAmqpDto> {
    return await this.ordersService.findOne(id);
  }

  @MessagePattern(OrderMessagePatterns.REMOVE_ORDER_BY_ID)
  async remove(@Payload() id: string) {
    return await this.ordersService.remove(id);
  }
}
