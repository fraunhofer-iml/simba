import { Inject, Injectable } from '@nestjs/common';
import { ProductDto } from '@ap3/api';
import { AmqpBrokerQueues, ProductMessagePatterns } from '@ap3/amqp';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor( @Inject(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) private readonly masterDataAMQPClient : ClientProxy){}

  findAll(): Promise<ProductDto[]> {
    return firstValueFrom(this.masterDataAMQPClient.send(ProductMessagePatterns.READ_ALL, {}));
  }

  findOne(id: string): Promise<ProductDto> {
    return firstValueFrom(this.masterDataAMQPClient.send(ProductMessagePatterns.READ_BY_ID, id));
  }
}
