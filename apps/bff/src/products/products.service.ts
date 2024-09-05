import { Inject, Injectable } from '@nestjs/common';
import { ProductDto, ProductMocks } from '@ap3/api';
import { AmqpBrokerQueues, ProduktMessagePatterns } from '@ap3/amqp';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor( @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient : ClientProxy){}

  findAll(): Promise<ProductDto[]> {
    return firstValueFrom(this.processAMQPClient.send(ProduktMessagePatterns.READ_ALL, {}));
  }

  findOne(id: number): Promise<ProductDto> {
    return firstValueFrom(this.processAMQPClient.send(ProduktMessagePatterns.READ_BY_ID, {id}));
  }
}