import { AuthRolesEnum, CreateOrderDto, OrderOverviewDto } from '@ap3/api';
import { Roles } from 'nest-keycloak-connect';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER] })
  @ApiOperation({
    description:
      'Creates an order and an corresponding process service, stores both entities in the database and transfers the order to the CPPS scheduler.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productId: { type: 'string' },
        amount: { type: 'number' },
        year: { type: 'number' },
        calendarWeek: { type: 'number' },
        customerId: { type: 'string' },
      },
    },
    required: true,
  })
  @Roles({ roles: [AuthRolesEnum.CUSTOMER] })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderOverviewDto> {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    description: 'Get all active orders.',
  })
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  async findAll(): Promise<OrderOverviewDto[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
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
  @Roles({ roles: [AuthRolesEnum.ADMIN] })
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
