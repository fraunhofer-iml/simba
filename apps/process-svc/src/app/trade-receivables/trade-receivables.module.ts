import { DatabaseModule, QueryBuilderHelperService } from '@ap3/database';
import { Module } from '@nestjs/common';
import { TradeReceivablesStatisticsService } from './trade-receivable-statistics.service';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService, TradeReceivablesStatisticsService, QueryBuilderHelperService],
})
export class TradeReceivablesModule {}
