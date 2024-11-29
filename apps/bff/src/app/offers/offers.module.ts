import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { BrokerAmqp } from '@ap3/amqp';

@Module({
  controllers: [OffersController],
  imports: [new BrokerAmqp().getProcessSvcBroker()],
  providers: [OffersService],
})
export class OffersModule {}
