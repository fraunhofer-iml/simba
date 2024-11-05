import util from 'node:util';
import { CreateOrderAmqpDto, OrderAmqpDto } from '@ap3/amqp';
import { ORDER_STATES_TO_SHOW, OrderStatesEnum } from '@ap3/config';
import { OrderOverview, OrderPrismaService } from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private readonly orderPrismaService: OrderPrismaService) {}

  async create(createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    this.logger.debug(`Received message from amqp: ${util.inspect(createOrderDto)}`);
    try {
      const createorderEntity: Prisma.OrderCreateInput = createOrderDto.toPrismaCreateEntity();
      this.logger.debug(`Create order: ${util.inspect(createorderEntity)}`);
      const newOrder: OrderOverview = await this.orderPrismaService.createOrder(createorderEntity);
      return OrderAmqpDto.fromPrismaEntity(newOrder);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findAll(): Promise<OrderAmqpDto[]> {
    const orderDtos: OrderAmqpDto[] = [];
    const orders: OrderOverview[] = await this.orderPrismaService.getOrdersForOverview();
    for (const order of orders) {
      const latestOrderStatus = await this.orderPrismaService.getLatestOrderStatus(order.id);
      if (ORDER_STATES_TO_SHOW.includes(latestOrderStatus.status)) {
        order.states = [latestOrderStatus];
        orderDtos.push(OrderAmqpDto.fromPrismaEntity(order));
      }
    }
    return orderDtos;
  }

  async findOne(id: string) {
    this.logger.debug(id);
    const order: OrderOverview = await this.orderPrismaService.getOverviewOrder(id);
    return OrderAmqpDto.fromPrismaEntity(order);
  }

  async updateOrderStatus(orderId: string, status: OrderStatesEnum) {
    await this.orderPrismaService.setOrderState(orderId, status);
  }

  async remove(id: string): Promise<boolean> {
    this.logger.debug(`Remove order with id: ${id}`);
    const deletedOrder: Order = await this.orderPrismaService.deleteOrder(id);
    return !!deletedOrder;
  }
}
