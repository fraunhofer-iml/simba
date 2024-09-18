import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { BrokerAmqp } from '@ap3/amqp';
import { OffersService } from '../offers/offers.service';
import { DtoConversionService } from '../shared/dto-conversion.service';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker()],
  controllers: [OrdersController],
  providers: [OrdersService, OffersService, DtoConversionService, ProductsService],
})
export class OrdersModule {}

