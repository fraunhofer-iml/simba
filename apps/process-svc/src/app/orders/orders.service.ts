import util from 'node:util';
import { CreateOrderAmqpDto, OrderAmqpDto, ServiceStatusAmqpDto } from '@ap3/amqp';
import { OrderOverview, OrderPrismaService, ServiceProcessPrismaService } from '@ap3/database';
import { SERVICE_STATES_TO_SHOW, ServiceStatesEnum } from '@ap3/util';
import { Injectable, Logger } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';

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

      const orderOverview: OrderOverview = await this.orderPrismaService.getOverviewOrder(newOrder.id);
      const currentState: ServiceStatusAmqpDto = OrderAmqpDto.getLatestState(orderOverview.serviceProcess.states);

      return OrderAmqpDto.fromPrismaEntity(orderOverview, currentState);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findAll(companyId: string): Promise<OrderAmqpDto[]> {
    const orderDtos: OrderAmqpDto[] = [];
    const orders: OrderOverview[] = await this.orderPrismaService.getOrdersForOverview(companyId);
    for (const order of orders) {
      const latestServiceStatus: ServiceStatusAmqpDto = OrderAmqpDto.getLatestState(order.serviceProcess.states);
      if (SERVICE_STATES_TO_SHOW.includes(latestServiceStatus?.status)) {
        orderDtos.push(OrderAmqpDto.fromPrismaEntity(order, latestServiceStatus));
      }
    }
    return orderDtos;
  }

  async findOne(id: string) {
    this.logger.debug(id);
    const order: OrderOverview = await this.orderPrismaService.getOverviewOrder(id);
    const currentState: ServiceStatusAmqpDto = OrderAmqpDto.getLatestState(order.serviceProcess.states);
    return OrderAmqpDto.fromPrismaEntity(order, currentState);
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
