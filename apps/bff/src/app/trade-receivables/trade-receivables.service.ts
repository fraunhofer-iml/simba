import {
  AmqpBrokerQueues,
  CreateTradeReceivableAmqpDto,
  NotPaidTrStatisticsAmqpDto,
  PaidTrStatisticsAmqpDto,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
  TRParamsCompanyIdAndYear,
} from '@ap3/amqp';
import { CreateTradeReceivableDto, TradeReceivableDto, UnpaidTrStatisticsDto } from '@ap3/api';
import { HARDCODEDBACKENDVALUES } from '@ap3/config';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);
  creditorId = HARDCODEDBACKENDVALUES.creditorId;

  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy,
    @Inject(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) private readonly masterDataAMQPClient: ClientProxy
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    const createTradeReceivableAmqpDto: CreateTradeReceivableAmqpDto = createTradeReceivableDto.toCreateTradeReceivableAmqpDto();
    const tradeReceivableAmqpDto = await firstValueFrom<TradeReceivableAmqpDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, createTradeReceivableAmqpDto).pipe(defaultIfEmpty(null))
    );
    return TradeReceivableDto.fromAmqpDto(tradeReceivableAmqpDto);
  }

  async getStatisticNotPaidTRPerMonth(): Promise<UnpaidTrStatisticsDto> {
    const notPaidTRStatistics: NotPaidTrStatisticsAmqpDto = await firstValueFrom<NotPaidTrStatisticsAmqpDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_TR_STATISTICS_NOT_PAID, this.creditorId)
    );

    return new UnpaidTrStatisticsDto(
      notPaidTRStatistics.outstandingTradeReceivableCount,
      notPaidTRStatistics.outstandingTradeReceivableValue,
      notPaidTRStatistics.overdueTradeReceivableCount,
      notPaidTRStatistics.overdueTradeReceivableValue
    );
  }

  async getStatisticPaidTRPerMonth(year: number): Promise<PaidTrStatisticsAmqpDto[]> {
    const tradeReceivableAmqpDto = await firstValueFrom<PaidTrStatisticsAmqpDto[]>(
      this.processAMQPClient
        .send(TradeReceivableMessagePatterns.READ_TR_STATISTICS_PAID, new TRParamsCompanyIdAndYear(this.creditorId, year))
        .pipe(defaultIfEmpty(null))
    );
    return tradeReceivableAmqpDto;
  }
}
