import { Inject, Injectable, Logger } from '@nestjs/common';
import { ProductDto } from '@ap3/api';
import { AmqpBrokerQueues, OrderAmqpDto, ProductMessagePatterns } from '@ap3/amqp';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);
  constructor( @Inject(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) private readonly masterDataAMQPClient : ClientProxy){}

  async findAll(): Promise<ProductDto[]> {
    return await firstValueFrom(this.masterDataAMQPClient.send(ProductMessagePatterns.READ_ALL, {}));
  }

  async findOne(id: string): Promise<ProductDto> {
    return await firstValueFrom(this.masterDataAMQPClient.send(ProductMessagePatterns.READ_BY_ID, id));
  }


  async loadProductRefs(dto: OrderAmqpDto){
    this.logger.debug("Retrieving Produkt for : " + dto.id);
    return await this.findOne(dto.productId);
  }
}

