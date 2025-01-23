import { BrokerAmqp } from '@ap3/amqp';
import { Module } from '@nestjs/common';
import { ServiceProcessController } from './service-process.controller';
import { ServiceProcessService } from './service-process.service';

@Module({
  imports: [new BrokerAmqp().getProcessSvcBroker()],
  controllers: [ServiceProcessController],
  providers: [ServiceProcessService],
})
export class ServiceProcessModule {}
