import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { BrokerAmqp } from '@ap3/amqp';
import { OffersService } from '../offers/offers.service';

@Module({
  imports: [new BrokerAmqp().getProcessSvcBroker()],
  controllers: [OrdersController],
  providers: [OrdersService, OffersService],
})
export class OrdersModule {}

