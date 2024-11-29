import {
  CreateTradeReceivableAmqpDto,
  NotPaidTrStatisticsAmqpDto,
  PaidTrStatisticsAmqpDto,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
  TRParamsCompanyIdAndYear,
} from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TradeReceivablesStatisticsService } from './trade-receivable-statistics.service';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
export class TradeReceivablesController {
  constructor(
    private readonly tradeReceivablesService: TradeReceivablesService,
    private readonly tradeReceivableStatisticsService: TradeReceivablesStatisticsService
  ) {}

  @MessagePattern(TradeReceivableMessagePatterns.CREATE)
  async create(@Payload() createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    return await this.tradeReceivablesService.create(createTradeReceivableDto);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_TR_STATISTICS_PAID)
  async calcPaidTradeReceivableVolumePerMonth(@Payload() params: TRParamsCompanyIdAndYear): Promise<PaidTrStatisticsAmqpDto[]> {
    return await this.tradeReceivableStatisticsService.calcPaidTradeReceivableVolumePerMonth(params.year, params.companyId);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_TR_STATISTICS_NOT_PAID)
  async getTradeReceivableNotPaidStatistics(@Payload() companyId: string): Promise<NotPaidTrStatisticsAmqpDto> {
    return await this.tradeReceivableStatisticsService.getTradeReceivablesNotPaidStatisticsByCompanyId(companyId);
  }
}
