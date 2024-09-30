import { DatabaseModule } from '@ap3/database';
import { Module } from '@nestjs/common';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService],
})
export class TradeReceivablesModule {}
