import { ConfigurationModule } from '@ap3/config';
import { Module } from '@nestjs/common';
import { CppsSchedulerConnectorService } from './cpps-scheduler-connector.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [CppsSchedulerConnectorService],
  exports: [CppsSchedulerConnectorService],
})
export class CppsSchedulerConnectorModule {}
