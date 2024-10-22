import { CreateOrderDto, OrderOverviewDto } from '@ap3/api';
import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
export class OrdersController {
  private logger = new Logger(OrdersController.name);
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    description: 'Accepts an order, stores it in the database and transfers it to the CPPS scheduler.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
        amount: { type: 'number' },
        dueMonth: { type: 'string' },
        customerId: { type: 'string' },
      },
    },
    required: true,
  })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderOverviewDto> {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    description: 'Get all active orders.',
  })
  async findAll(): Promise<OrderOverviewDto[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get an order based on the corresponding order id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  async findOne(@Param('id') id: string): Promise<OrderOverviewDto> {
    return await this.ordersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Delete an order based on the corresponding order id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  async deleteOne(@Param('id') id: string): Promise<void> {
    await this.ordersService.deleteOne(id);
  }
}
