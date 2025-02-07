import { BlockchainConnectorModule } from '@ap3/blockchain-connector';
import { ConfigurationModule } from '@ap3/config';
import { DatabaseModule } from '@ap3/database';
import { S3Module } from '@ap3/s3';
import { Module } from '@nestjs/common';
import { InvoicesStatisticsService } from '../invoices/statistics/invoices-statistics.service';
import { MetadataService } from './metadata/metadata.service';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

@Module({
  imports: [DatabaseModule, S3Module, ConfigurationModule, BlockchainConnectorModule],
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService, InvoicesStatisticsService, MetadataService],
})
export class TradeReceivablesModule {}
