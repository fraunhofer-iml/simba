import util from 'node:util';
import { CreateOrderAmqpDto, OrderAmqpDto } from '@ap3/amqp';
import { SERVICE_STATES_TO_SHOW, ServiceStatesEnum } from '@ap3/config';
import { OrderOverview, OrderPrismaService, ServiceProcessPrismaService } from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';
import { Order, Prisma, ServiceStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly orderPrismaService: OrderPrismaService,
    private readonly serviceProcessPrismaService: ServiceProcessPrismaService
  ) {}

  async create(createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    this.logger.verbose(`Received message from amqp: ${util.inspect(createOrderDto)}`);
    try {
      const createOrderEntity: Prisma.OrderCreateInput = createOrderDto.toPrismaCreateEntity();
      this.logger.debug(`Create order: ${util.inspect(createOrderEntity)}`);
      const newOrder: Order = await this.orderPrismaService.createOrder(createOrderEntity);
      await this.serviceProcessPrismaService.setServiceState(newOrder.id, ServiceStatesEnum.OPEN);

      return OrderAmqpDto.fromPrismaEntity(await this.orderPrismaService.getOverviewOrder(newOrder.id));
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findAll(): Promise<OrderAmqpDto[]> {
    const orderDtos: OrderAmqpDto[] = [];
    const orders: OrderOverview[] = await this.orderPrismaService.getOrdersForOverview();
    for (const order of orders) {
      const latestServiceStatus: ServiceStatus = await this.orderPrismaService.getLatestServiceStatus(order.id);
      if (SERVICE_STATES_TO_SHOW.includes(latestServiceStatus.status)) {
        order.serviceProcess.states = [latestServiceStatus];
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

  async updateOrderStatus(orderId: string, status: ServiceStatesEnum) {
    await this.serviceProcessPrismaService.setServiceState(orderId, status);
  }

  async remove(id: string): Promise<boolean> {
    this.logger.debug(`Remove order with id: ${id}`);
    const deletedOrder: Order = await this.orderPrismaService.deleteOrder(id);
    return !!deletedOrder;
  }
}
