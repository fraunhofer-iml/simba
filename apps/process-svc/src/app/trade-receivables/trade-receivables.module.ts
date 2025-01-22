import { DatabaseModule, QueryBuilderHelperService } from '@ap3/database';
import { Module } from '@nestjs/common';
import { InvoicesStatisticsService } from '../invoices/statistics/invoices-statistics.service';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService, InvoicesStatisticsService, QueryBuilderHelperService],
})
export class TradeReceivablesModule {}
