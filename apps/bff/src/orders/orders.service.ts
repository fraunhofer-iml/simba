import {Injectable, Inject, Logger} from '@nestjs/common';
import {CreateOrderDto, OrderDto} from '@ap3/api';
import { AmqpBrokerQueues, OrderMessagePatterns, CreateOrderAmqpDto, OrderAmqpDto } from '@ap3/amqp';
import { ClientProxy } from '@nestjs/microservices';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import * as util from "node:util";

@Injectable()
export class OrdersService {
  private logger = new Logger(OrdersService.name);

  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {
  }

  async create(createOrderDto: CreateOrderDto): Promise<void> {
    try {
      const createOrder: CreateOrderAmqpDto = CreateOrderAmqpDto.fromFEDto(createOrderDto);
      await firstValueFrom<OrderAmqpDto>(this.processAMQPClient.send(OrderMessagePatterns.CREATE, createOrder));
    }catch (e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findAll(): Promise<OrderDto[]> {
    const retVal: OrderDto[] = [];
    const orders = await firstValueFrom<OrderAmqpDto[]>(this.processAMQPClient.send(OrderMessagePatterns.READ_ALL, {}));
    orders.forEach((order:OrderAmqpDto) => {
      retVal.push(this.toFEDto(order));
    })
    return retVal;
  }

  async findOne(id: string): Promise<OrderDto> {
    const order = await firstValueFrom<OrderAmqpDto>(this.processAMQPClient.send(OrderMessagePatterns.READ_BY_ID, id));
    return this.toFEDto(order);
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await lastValueFrom<void>(this.processAMQPClient.send(OrderMessagePatterns.REMOVE_ORDER_BY_ID, id));
    }catch(e){
      //TODO: 'no elements in sequence' error
      this.logger.log(util.inspect(e));
    }
  }

  private toFEDto(order:OrderAmqpDto): OrderDto {
    return <OrderDto>{
      id: order.id,
      productId: order.productId,
      amount: order.amount,
      dueMonth: order.dueMonth,
      creationDate: order.creationDate,
      status: order.status,
      acceptedOfferId: order.acceptedOfferId,
      offerIds: order.offerIds,
      robots: order.robots,
      customerId: order.customerId,
      tradeReceivableId: order.tradeReceivableId,
    }
  }
}
