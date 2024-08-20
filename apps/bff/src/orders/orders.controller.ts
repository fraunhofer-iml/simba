import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderDto } from '@ap3/api';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    description: 'Create a new order.'
  })
  create(@Body() createOrderDto: CreateOrderDto): void {
    this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    description: 'Get all active orders.'
  })
  findAll(): OrderDto[] {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get an order based on the corresponding order id.'
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
