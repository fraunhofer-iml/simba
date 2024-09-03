import { Injectable, Inject } from '@nestjs/common';
import { CreateOrderDto, OrderDto, OrderMock } from '@ap3/api';
import { AmqpBrokerQueues, OrderMessagePatterns } from '@ap3/amqp';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient : ClientProxy) {
  }

  create(createOrderDto: CreateOrderDto) {
    return firstValueFrom(this.processAMQPClient.send(OrderMessagePatterns.CREATE, createOrderDto));
  }

  findAll(): OrderDto[] {
    return OrderMock;
  }

  findOne(id: string): OrderDto {
    return OrderMock[0];
  }
}
