import { BrokerAmqp } from '@ap3/amqp';
import { Module } from '@nestjs/common';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

@Module({
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService],
  imports: [new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker()],
})
export class TradeReceivablesModule {}
