import {Injectable, Logger, NotImplementedException} from '@nestjs/common';
import {OrderPrismaService, OrderWithAcceptedOffer} from '@ap3/database';
import {Order, Prisma} from '@prisma/client';
import util from "node:util";
import {CreateOrderAmqpDto, OrderAmqpDto, UpdateOrderAmqpDto} from "@ap3/amqp";

@Injectable()
export class OrdersService {
  private logger = new Logger(OrdersService.name);

  constructor(private readonly orderPrismaService: OrderPrismaService) {
  }
  async create(createOrderDto: CreateOrderAmqpDto): Promise<OrderAmqpDto> {
    this.logger.debug(`Received message from amqp: ${util.inspect(createOrderDto)}`);
    try {
      const newOrder:Prisma.OrderCreateInput = createOrderDto.toPrismaEntity();
      this.logger.debug(`Create order: ${util.inspect(newOrder)}`);
      return OrderAmqpDto.fromPrismaEntity(await this.orderPrismaService.createOrder(newOrder));
    }catch (e){
      this.logger.error(e)
    }
  }

  async findAll(): Promise<OrderAmqpDto[]> {
    const orderDtos: OrderAmqpDto[] = [];
     const orders: Order[] = await this.orderPrismaService.getOrders();
     orders.forEach((order:Order) => {
       orderDtos.push(OrderAmqpDto.fromPrismaEntity(order));
     });
     return orderDtos;
  }

  async findOne(id: string) {
    this.logger.debug(id);
    const order: OrderWithAcceptedOffer = await this.orderPrismaService.getOrder({id: id});
    return OrderAmqpDto.fromPrismaEntity(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderAmqpDto) {
    throw new NotImplementedException("An update for orders is not planned yet.");
  }

  async remove(id: string): Promise<void> {
    this.logger.debug(`Remove order with id: ${id}`);
    await this.orderPrismaService.deleteOrder({id: id});
  }
}
