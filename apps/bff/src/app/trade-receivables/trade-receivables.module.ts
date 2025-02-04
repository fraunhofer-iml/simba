import { BrokerAmqp } from '@ap3/amqp';
import { Module } from '@nestjs/common';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';
import { BlockchainConnectorModule } from '@ap3/blockchain-connector';

@Module({
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService],
  imports: [new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker(), BlockchainConnectorModule],
})
export class TradeReceivablesModule {}
