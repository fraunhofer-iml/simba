import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { BrokerAmqp } from '@ap3/amqp';

@Module({
  imports: [new BrokerAmqp().getMasterDataSvcBroker()],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
