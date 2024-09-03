import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderMessagePatterns } from '@ap3/amqp';
import * as util from 'node:util';

@Controller()
export class OrdersController {
  private logger = new Logger(OrdersController.name);

  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(OrderMessagePatterns.CREATE)
  create(@Payload() createOrderDto: CreateOrderDto) {
    this.logger.debug(`Received message from amqp: ${util.inspect(createOrderDto)}`);
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern(OrderMessagePatterns.READ_ALL)
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern(OrderMessagePatterns.READ_BY_ID)
  findOne(@Payload() id: number) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern(OrderMessagePatterns.REMOVE_ORDER_BY_ID)
  remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }
}
