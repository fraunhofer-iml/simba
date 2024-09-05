import { Inject, Injectable } from '@nestjs/common';
import { TradeReceivableDto, TradeReceivableMocks } from '@ap3/api';
import { ClientProxy } from '@nestjs/microservices';
import { AmqpBrokerQueues, TradeReceivableMessagePatterns } from '@ap3/amqp';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TradeReceivablesService {

  constructor( @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient : ClientProxy){}
  
  create(orderId: string): Promise<void> {
    return firstValueFrom(this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, {orderId}));;
  }

  findAll(): Promise<TradeReceivableDto[]> {
    return firstValueFrom(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL, {}));;
  }

  findOne(id: string): Promise<TradeReceivableDto> {
    return firstValueFrom(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, {id}));;
  }
}
