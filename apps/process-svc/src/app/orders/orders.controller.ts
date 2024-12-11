import { CreateOrderAmqpDto, OrderAmqpDto, OrderMessagePatterns } from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(OrderMessagePatterns.CREATE)
  async create(@Payload() createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    return await this.ordersService.create(createOrderDto);
  }

  @MessagePattern(OrderMessagePatterns.READ_ALL)
  async findAll(@Payload() companyId: string): Promise<OrderAmqpDto[]> {
    return await this.ordersService.findAll(companyId);
  }

  @MessagePattern(OrderMessagePatterns.READ_BY_ID)
  async findOne(@Payload() id: string): Promise<OrderAmqpDto> {
    return await this.ordersService.findOne(id);
  }

  @MessagePattern(OrderMessagePatterns.REMOVE_ORDER_BY_ID)
  async remove(@Payload() id: string): Promise<boolean> {
    return await this.ordersService.remove(id);
  }
}
