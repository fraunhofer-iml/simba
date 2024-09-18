import { Inject, Injectable } from '@nestjs/common';
import { TradeReceivableDto } from '@ap3/api';
import { ClientProxy } from '@nestjs/microservices';
import { AmqpBrokerQueues, TradeReceivableMessagePatterns } from '@ap3/amqp';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TradeReceivablesService {

  constructor( @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient : ClientProxy){}

  async create(orderId: string): Promise<void> {
    return await firstValueFrom(this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, {orderId}));;
  }

  async findAll(): Promise<TradeReceivableDto[]> {
    return await firstValueFrom(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL, {}));;
  }

  async findOne(id: string): Promise<TradeReceivableDto> {
    return await firstValueFrom(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, {id}));;
  }
}
