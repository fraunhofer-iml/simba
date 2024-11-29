import { BrokerAmqp } from '@ap3/amqp';
import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
  imports: [new BrokerAmqp().getProcessSvcBroker(), CompaniesModule],
})
export class InvoicesModule {}
