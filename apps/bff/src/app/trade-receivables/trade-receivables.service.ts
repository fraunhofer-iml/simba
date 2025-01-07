import {
  AmqpBrokerQueues,
  CreateTradeReceivableAmqpDto,
  NotPaidTrStatisticsAmqpDto,
  PaidTrStatisticsAmqpDto,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
  TRParamsCompanyIdAndFinancialRole,
  TRParamsCompanyIdAndYearAndFinancialRole,
} from '@ap3/amqp';
import { CreateTradeReceivableDto, FinancialRoles, PaidTrStatisticsDto, TradeReceivableDto, UnpaidTrStatisticsDto } from '@ap3/api';
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
    return TradeReceivableDto.fromAmqpDto(tradeReceivableAmqpDto);
  }

  async getStatisticNotPaidTRPerMonth(creditorId: string, financialRole: FinancialRoles): Promise<UnpaidTrStatisticsDto> {
    const notPaidTRStatistics: NotPaidTrStatisticsAmqpDto = await firstValueFrom<NotPaidTrStatisticsAmqpDto>(
      this.processAMQPClient.send(
        TradeReceivableMessagePatterns.READ_TR_STATISTICS_NOT_PAID,
        new TRParamsCompanyIdAndFinancialRole(creditorId, financialRole)
      )
    );

    return UnpaidTrStatisticsDto.toUnpaidStatisticsDto(notPaidTRStatistics);
  }

  async getStatisticPaidTRPerMonth(creditorId: string, year: number, financialRole: FinancialRoles): Promise<PaidTrStatisticsDto[]> {
    const tradeReceivableDtos: PaidTrStatisticsDto[] = [];
    const tradeReceivableAmqpDtos: PaidTrStatisticsAmqpDto[] = await firstValueFrom<PaidTrStatisticsAmqpDto[]>(
      this.processAMQPClient
        .send(
          TradeReceivableMessagePatterns.READ_TR_STATISTICS_PAID,
          new TRParamsCompanyIdAndYearAndFinancialRole(creditorId, year, financialRole)
        )
        .pipe(defaultIfEmpty(null))
    );
    for (const amqpTr of tradeReceivableAmqpDtos) {
      tradeReceivableDtos.push(PaidTrStatisticsDto.toPaidTrStatisiticsDto(amqpTr));
    }
    return tradeReceivableDtos;
  }
}
