import * as util from 'node:util';
import {
  AmqpBrokerQueues,
  CreateTradeReceivableAmqpDto,
  NotPaidTrStatisticsAmqpDto,
  PaidTrStatisticsAmqpDto,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
  TRParamsCompanyIdAndPaymentState,
  TRParamsCompanyIdAndYear,
} from '@ap3/amqp';
import { CreateTradeReceivableDto, TradeReceivableDto, UnpaidTrStatisticsDto } from '@ap3/api';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);

  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy,
    @Inject(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) private readonly masterDataAMQPClient: ClientProxy
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    const createTradeReceivableAmqpDto: CreateTradeReceivableAmqpDto = createTradeReceivableDto.toCreateTradeReceivableAmqpDto();
    const tradeReceivableAmqpDto = await firstValueFrom<TradeReceivableAmqpDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, createTradeReceivableAmqpDto).pipe(defaultIfEmpty(null))
    );
    return (await this.handleFrontendTradeReceivableDTOCreation([tradeReceivableAmqpDto]))[0];
  }

  async findAll(debtorId: string, creditorId: string, orderId: string): Promise<TradeReceivableDto[]> {
    this.logger.debug(`Requesting Tradereceivables debtor #${debtorId}, creditor #${creditorId}, order #${orderId}`);
    let response: TradeReceivableAmqpDto[] = [];
    if (debtorId) {
      response = await firstValueFrom<TradeReceivableAmqpDto[]>(
        this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_DEBTOR_ID, debtorId)
      );
    } else if (creditorId) {
      response = await firstValueFrom<TradeReceivableAmqpDto[]>(
        this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_CREDITOR_ID, creditorId)
      );
    } else if (orderId) {
      response = await firstValueFrom<TradeReceivableAmqpDto[]>(
        this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ORDER_ID, orderId)
      );
    } else {
      response = await firstValueFrom<TradeReceivableAmqpDto[]>(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL, {}));
    }
    return await this.handleFrontendTradeReceivableDTOCreation(response);
  }

  async findOne(id: string): Promise<TradeReceivableDto> {
    this.logger.verbose('Requesting trade receivable ', id);
    const retVal = await firstValueFrom<TradeReceivableAmqpDto>(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, id));
    return (await this.handleFrontendTradeReceivableDTOCreation([retVal]))[0];
  }

  async getStatisticNotPaidTRPerMonth(creditorId: string): Promise<UnpaidTrStatisticsDto> {
    const notPaidTRStatistics: NotPaidTrStatisticsAmqpDto = await firstValueFrom<NotPaidTrStatisticsAmqpDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_TR_STATISTICS_NOT_PAID, creditorId)
    );

    return new UnpaidTrStatisticsDto(
      notPaidTRStatistics.outstandingTradeReceivableCount,
      notPaidTRStatistics.outstandingTradeReceivableValue,
      notPaidTRStatistics.overdueTradeReceivableCount,
      notPaidTRStatistics.overdueTradeReceivableValue
    );
  }

  async getStatisticPaidTRPerMonth(year: number, creditorId: string): Promise<PaidTrStatisticsAmqpDto[]> {
    const tradeReceivableAmqpDto = await firstValueFrom<PaidTrStatisticsAmqpDto[]>(
      this.processAMQPClient
        .send(TradeReceivableMessagePatterns.READ_TR_STATISTICS_PAID, new TRParamsCompanyIdAndYear(creditorId, year))
        .pipe(defaultIfEmpty(null))
    );
    return tradeReceivableAmqpDto;
  }

  async findAllByCreditorAndPaymentState(creditorId: string, paymentState: string): Promise<TradeReceivableDto[]> {
    this.logger.debug(`Request all TRs with state ${paymentState}`);
    const params = new TRParamsCompanyIdAndPaymentState(creditorId, paymentState);
    const response: TradeReceivableAmqpDto[] = await firstValueFrom<TradeReceivableAmqpDto[]>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL_BY_PAYMENT_STATE_AND_COMPANY_ID, params)
    );

    return await this.handleFrontendTradeReceivableDTOCreation(response);
  }

  private async handleFrontendTradeReceivableDTOCreation(tradeReceivables: TradeReceivableAmqpDto[]): Promise<TradeReceivableDto[]> {
    const retVal: TradeReceivableDto[] = [];
    this.logger.verbose(`Create Frontend Dtos for ${util.inspect(tradeReceivables)}`);
    for (const tr of tradeReceivables) {
      //TODO: implement company endpoint
      retVal.push(TradeReceivableDto.toTradeReceivableDto(tr, 'Kreditor', 'Debitor'));
    }
    return retVal;
  }
}
