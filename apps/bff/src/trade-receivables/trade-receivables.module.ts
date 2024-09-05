import { Module } from '@nestjs/common';
import { TradeReceivablesService } from './trade-receivables.service';
import { TradeReceivablesController } from './trade-receivables.controller';
import { BrokerAmqp } from '@ap3/amqp';

@Module({
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService],
  imports: [new BrokerAmqp().getProcessSvcBroker()],
})
export class TradeReceivablesModule {}
