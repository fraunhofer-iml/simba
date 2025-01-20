import util from 'node:util';
import {
  AllInvoicesFilter,
  AmqpBrokerQueues,
  CompanyAmqpDto,
  CompanyIdAndInvoiceId,
  CompanyIdAndPaymentState,
  InvoiceAmqpDto,
  InvoiceMessagePatterns,
} from '@ap3/amqp';
import { InvoiceDto } from '@ap3/api';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy,
    private readonly companyService: CompaniesService
  ) {}

  async findAllWithFilter(creditorId: string, debtorId: string, paymentState: string): Promise<InvoiceDto[]> {
    this.logger.debug(`Requesting Tradereceivables `);
    const params = new AllInvoicesFilter(creditorId, debtorId, paymentState);
    const response: InvoiceAmqpDto[] = await firstValueFrom<InvoiceAmqpDto[]>(
      this.processAMQPClient.send(InvoiceMessagePatterns.READ_ALL, params)
    );

    return await this.handleFrontendTradeReceivableDTOCreation(response);
  }

  async findOne(companyId: string, id: string): Promise<InvoiceDto> {
    try {
      this.logger.verbose('Requesting trade receivable ', id);
      const params = new CompanyIdAndInvoiceId(companyId, id);
      const retVal = await firstValueFrom<InvoiceAmqpDto>(this.processAMQPClient.send(InvoiceMessagePatterns.READ_BY_ID, params));
      return (await this.handleFrontendTradeReceivableDTOCreation([retVal]))[0];
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }

  private async handleFrontendTradeReceivableDTOCreation(tradeReceivables: InvoiceAmqpDto[]): Promise<InvoiceDto[]> {
    const retVal: InvoiceDto[] = [];
    const companies: Map<string, CompanyAmqpDto> = new Map();
    this.logger.verbose(`Create Frontend Dtos for ${util.inspect(tradeReceivables)}`);
    for (const tr of tradeReceivables) {
      if (!companies.has(tr.creditorId)) {
        companies.set(tr.creditorId, await this.companyService.findOne(tr.creditorId));
      }
      if (!companies.has(tr.debtorId)) {
        companies.set(tr.debtorId, await this.companyService.findOne(tr.debtorId));
      }

      retVal.push(InvoiceDto.toTradeReceivableDto(tr, companies.get(tr.creditorId).name, companies.get(tr.debtorId).name));
    }
    return retVal;
  }

  async createAndUploadZugferdPDF(companyId: string, id: string): Promise<string> {
    try {
      this.logger.verbose('Requesting zugferd pdf creation for invoice ', id);
      const params = new CompanyIdAndInvoiceId(companyId, id);
      return await firstValueFrom<string>(this.processAMQPClient.send(InvoiceMessagePatterns.CREATE_AND_UPLOAD_ZUGFERD_PDF, params));
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }
}
