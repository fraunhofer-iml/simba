import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { BrokerAmqp } from '@ap3/amqp';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [new BrokerAmqp().getProcessSvcBroker()],
})
export class ProductsModule {}
