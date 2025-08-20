import { AllInvoicesFilterAmqpDto, InvoiceIdAndPaymentStateAmqpDto } from '@ap3/amqp';
import { ConfigurationService } from '@ap3/config';
import { InvoiceDatabaseAdapterService, InvoiceWithOrderBuyerRef } from '@ap3/database';
import { PaymentStates } from '@ap3/util';
import { CronJob } from 'cron';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { PaymentManagementService } from '../invoices/payment-management/payment-management.service';
import { NftsService } from './nfts.service';

@Injectable()
export class NftsCronJob {
  private readonly logger = new Logger(NftsCronJob.name);

  constructor(
    private readonly nftsService: NftsService,
    private readonly config: ConfigurationService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly invoicePrismaAdapterService: InvoiceDatabaseAdapterService,
    private readonly paymentStatesService: PaymentManagementService
  ) {
    if (config.getGeneralConfig().scheduledNFTUpdate.enabled) {
      this.logger.log(`Cron job for updating payment status to exceeded is activated`);
      this.addCronJob();
    }
  }

  private addCronJob(): void {
    const cronExpression: string = this.config.getGeneralConfig().scheduledNFTUpdate.interval;
    const newCronJob: CronJob = new CronJob(cronExpression, () => this.schedulePaymentExceedCheck());
    this.schedulerRegistry.addCronJob('checkExceededNFTs', newCronJob);
    newCronJob.start();
  }

  private async schedulePaymentExceedCheck(): Promise<void> {
    const invoices: InvoiceWithOrderBuyerRef[] = await this.invoicePrismaAdapterService.getInvoicesCorrespondingToFilterParams(
      new AllInvoicesFilterAmqpDto([PaymentStates.OPEN]),
      []
    );
    for (const invoice of invoices) {
      if (invoice.dueDate < new Date()) {
        await this.paymentStatesService.createPaymentStateAndUpdateNft([
          new InvoiceIdAndPaymentStateAmqpDto(invoice.invoiceNumber, PaymentStates.EXCEEDED),
        ]);
      }
    }
  }
}
