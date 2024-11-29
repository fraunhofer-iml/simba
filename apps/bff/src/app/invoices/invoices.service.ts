import util from 'node:util';
import {
  AmqpBrokerQueues, CompanyAmqpDto,
  InvoiceAmqpDto,
  InvoiceMessagePatterns,
  TRParamsCompanyIdAndPaymentState,
} from '@ap3/amqp';
import { InvoiceDto } from '@ap3/api';
import { HARDCODEDBACKENDVALUES } from '@ap3/config';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  creditorId = HARDCODEDBACKENDVALUES.creditorId;
  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy, private readonly companyService: CompaniesService) {}

  async findAll(orderId: string): Promise<InvoiceDto[]> {
    this.logger.debug(`Requesting Tradereceivables order #${orderId}`);
    let response: InvoiceAmqpDto[] = [];
    if (orderId) {
      response = await firstValueFrom<InvoiceAmqpDto[]>(this.processAMQPClient.send(InvoiceMessagePatterns.READ_BY_ORDER_ID, orderId));
    } else {
      response = await firstValueFrom<InvoiceAmqpDto[]>(this.processAMQPClient.send(InvoiceMessagePatterns.READ_ALL, {}));
    }
    return await this.handleFrontendTradeReceivableDTOCreation(response);
  }

  async findOne(id: string): Promise<InvoiceDto> {
    try {
      this.logger.verbose('Requesting trade receivable ', id);
      const retVal = await firstValueFrom<InvoiceAmqpDto>(this.processAMQPClient.send(InvoiceMessagePatterns.READ_BY_ID, id));
      return (await this.handleFrontendTradeReceivableDTOCreation([retVal]))[0];
    }catch (e){
      this.logger.warn(e);
      throw e;
    }
  }
  async findAllByPaymentState(paymentState: string): Promise<InvoiceDto[]> {
    this.logger.debug(`Request all TRs with state ${paymentState}`);
    const params = new TRParamsCompanyIdAndPaymentState(this.creditorId, paymentState);
    const response: InvoiceAmqpDto[] = await firstValueFrom<InvoiceAmqpDto[]>(
      this.processAMQPClient.send(InvoiceMessagePatterns.READ_ALL_BY_PAYMENT_STATE, params)
    );

    return await this.handleFrontendTradeReceivableDTOCreation(response);
  }

  private async handleFrontendTradeReceivableDTOCreation(tradeReceivables: InvoiceAmqpDto[]): Promise<InvoiceDto[]> {
    const retVal: InvoiceDto[] = [];
    const companies: Map<string, CompanyAmqpDto> = new Map();
    this.logger.verbose(`Create Frontend Dtos for ${util.inspect(tradeReceivables)}`);
    for (const tr of tradeReceivables) {
      if(!companies.has(tr.creditorId)){
        companies.set(tr.creditorId, await this.companyService.findOne(tr.creditorId));
      }
      if(!companies.has(tr.debtorId)){
        companies.set(tr.debtorId, await this.companyService.findOne(tr.debtorId));
      }

      retVal.push(InvoiceDto.toTradeReceivableDto(tr, companies.get(tr.creditorId).name, companies.get(tr.debtorId).name));
    }
    return retVal;
  }
}
