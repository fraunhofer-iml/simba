import {Injectable, Logger, NotImplementedException} from '@nestjs/common';
import {OrderPrismaService, OrderWithAcceptedOffer} from '@ap3/database';
import {Order, Prisma} from '@prisma/client';
import util from "node:util";
import {CreateOrderAmqpDto, OrderAmqpDto, UpdateOrderAmqpDto} from "@ap3/amqp";
import {ORDER_STATES_TO_SHOW} from "@ap3/config";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private readonly orderPrismaService: OrderPrismaService) {
  }

  async create(createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    this.logger.debug(`Received message from amqp: ${util.inspect(createOrderDto)}`);
    try {
      const newOrder:Prisma.OrderCreateInput = createOrderDto.toPrismaCreateEntity();
      this.logger.debug(`Create order: ${util.inspect(newOrder)}`);
      return OrderAmqpDto.fromPrismaEntity(await this.orderPrismaService.createOrder(newOrder));
    }catch (e){
      this.logger.error(e)
    }
  }

  async findAll(): Promise<OrderAmqpDto[]> {
    const orderDtos: OrderAmqpDto[] = [];
     const orders: Order[] = await this.orderPrismaService.getOrders(ORDER_STATES_TO_SHOW);
     orders.forEach((order:Order) => {
       orderDtos.push(OrderAmqpDto.fromPrismaEntity(order));
     });
     return orderDtos;
  }

  async findOne(id: string) {
    this.logger.debug(id);
    const order: OrderWithAcceptedOffer = await this.orderPrismaService.getOrder(id);
    return OrderAmqpDto.fromPrismaEntity(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderAmqpDto) {
    throw new NotImplementedException("An update for orders is not planned yet.");
  }

  async remove(id: string): Promise<boolean> {
    this.logger.debug(`Remove order with id: ${id}`);
    const deletedOrder: Order = await this.orderPrismaService.deleteOrder(id);
    return !!deletedOrder;
  }
}
