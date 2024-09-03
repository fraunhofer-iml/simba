import { Module } from '@nestjs/common';
import { ConfigurationModule, ConfigurationService } from '@ap3/config';
import { BrokerAmqp } from './broker.amqp';

@Module({
  imports: [],
	controllers: [],
	providers: [],
	exports: [BrokerAmqp],
})
export class AmqpModule {}
