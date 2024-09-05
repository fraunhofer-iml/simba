import {Injectable, Inject, Logger} from '@nestjs/common';
import { CreateOrderDto, OrderDto } from '@ap3/api';
import { AmqpBrokerQueues, OrderMessagePatterns } from '@ap3/amqp';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as util from "node:util";

@Injectable()
export class OrdersService {
  private logger = new Logger(OrdersService.name);

  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {
  }

  async create(createOrderDto: CreateOrderDto): Promise<void> {
    try {
      await firstValueFrom(this.processAMQPClient.send(OrderMessagePatterns.CREATE, createOrderDto));
    }catch (e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findAll(): Promise<OrderDto[]> {
    return await firstValueFrom(this.processAMQPClient.send(OrderMessagePatterns.READ_ALL, {}));
  }

  async findOne(id: string): Promise<OrderDto> {
    return await firstValueFrom(this.processAMQPClient.send(OrderMessagePatterns.READ_BY_ID, {id}));;
  }
}
