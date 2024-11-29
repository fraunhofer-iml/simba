import { BrokerAmqp } from '@ap3/amqp';
import { Module } from '@nestjs/common';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker()],
  controllers: [OrdersController],
  providers: [OrdersService, OffersService, ProductsService],
})
export class OrdersModule {}
