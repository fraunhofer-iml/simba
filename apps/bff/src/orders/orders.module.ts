import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { BrokerAmqp } from '@ap3/amqp';

@Module({
  imports: [new BrokerAmqp().getProcessSvcBroker()],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

