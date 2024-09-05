import {Injectable, Logger} from '@nestjs/common';
import { OrderPrismaService } from '@ap3/database';
import { Order, Prisma } from '@prisma/client';
import { CreateOrderDto, OrderDto, UpdateOrderDto } from '@ap3/api';
import { OrderStatesEnum } from '@ap3/config';
import util from "node:util";

@Injectable()
export class OrdersService {
  private logger = new Logger(OrdersService.name);

  constructor(private readonly orderPrismaService: OrderPrismaService) {
  }
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    this.logger.debug(`Received message from amqp: ${util.inspect(createOrderDto)}`);
    try {
      const newOrder: Prisma.OrderCreateInput = {
        creationDate: new Date().toISOString(),
        amount: createOrderDto.amount,
        status: OrderStatesEnum.NEW,
        calendarWeek: createOrderDto.calendarWeek.toString(),
        product: { connect: { id: createOrderDto.productId }},
        customer: { connect: { id: createOrderDto.customerId }}
      }
      this.logger.debug(`Create order: ${util.inspect(newOrder)}`);
      return await this.orderPrismaService.createOrder(newOrder);
    }catch (e){
      this.logger.error(e)
    }
  }

  async findAll(): Promise<OrderDto[]> {
    const orderDtos: OrderDto[] = [];
     const orders: Order[] = await this.orderPrismaService.getOrders();
     orders.forEach((order:Order) => {
       orderDtos.push({
         id: order.id,
         productId: order.productId,
         product: {id: order.productId, name: 'Quadrocopter'}, //TODO: Load from database
         amount: order.amount,
         calendarWeek: +order.calendarWeek,
         creationDate: order.creationDate.toISOString(),
         status: order.status,
         price: 0.33, //TODO: Remove from model or replace with offer price
         robots: order.machines,
         customerId: order.participantId,
       });
     });
     return orderDtos;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
