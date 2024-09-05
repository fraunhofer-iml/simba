import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderDto } from '@ap3/api';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    description: 'Accepts an order, stores it in the database and transfers it to the CPPS scheduler.'
  })
  @ApiBody({
    schema: {
      type:'object',
      properties:{
        productId:{type:'string'},
        amount:{type:'number'},
        calendarWeek:{type:'number'},
        customerId:{type:'string'},
      }
    },
    required:true
  })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<void> {
    await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    description: 'Get all active orders.'
  })
  async findAll(): Promise<OrderDto[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get an order based on the corresponding order id.'
  })
  @ApiParam({

    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  async findOne(@Param('id') id: string): Promise<OrderDto> {
    return await this.ordersService.findOne(id);
  }
}
