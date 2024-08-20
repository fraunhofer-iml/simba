import { Module } from '@nestjs/common';
import { TradeReceivablesService } from './trade-receivables.service';
import { TradeReceivablesController } from './trade-receivables.controller';

@Module({
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService],
})
export class TradeReceivablesModule {}
