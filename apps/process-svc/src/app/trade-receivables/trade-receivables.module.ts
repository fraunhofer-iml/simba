import { DatabaseModule, QueryBuilderHelperService } from '@ap3/database';
import { Module } from '@nestjs/common';
import { InvoicesStatisticsService } from '../invoices/statistics/invoices-statistics.service';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';
import { BlockchainConnectorModule } from '@ap3/blockchain-connector';
import { S3Module } from '@ap3/s3';
import { MetadataService } from './metadata/metadata.service';
import { ConfigurationModule } from '@ap3/config';

@Module({
  imports: [DatabaseModule, S3Module, ConfigurationModule, BlockchainConnectorModule],
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService, InvoicesStatisticsService, QueryBuilderHelperService, MetadataService],
})
export class TradeReceivablesModule {}
