import {
  CreateTradeReceivableAmqpDto,
  NotPaidTrStatisticsAmqpDto,
  PaidTrStatisticsAmqpDto,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
  TRParamsCompanyIdAndPaymentState,
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

  @MessagePattern(TradeReceivableMessagePatterns.READ_ALL)
  async findAll(): Promise<TradeReceivableAmqpDto[]> {
    return await this.tradeReceivablesService.findAll();
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_BY_ID)
  async findOneById(@Payload() id: string): Promise<TradeReceivableAmqpDto> {
    return await this.tradeReceivablesService.findOne(id);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_BY_DEBTOR_ID)
  async findAllByDebtorId(@Payload() userId: string): Promise<TradeReceivableAmqpDto[]> {
    return await this.tradeReceivablesService.findByDebtor(userId);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_BY_CREDITOR_ID)
  async findAllByCreditorId(@Payload() userId: string): Promise<TradeReceivableAmqpDto[]> {
    return await this.tradeReceivablesService.findByCreditor(userId);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_BY_ORDER_ID)
  async findAllByOrderId(@Payload() orderId: string): Promise<TradeReceivableAmqpDto[]> {
    return await this.tradeReceivablesService.findByOrder(orderId);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_TR_STATISTICS_PAID)
  async calcPaidTradeReceivableVolumePerMonth(@Payload() params: TRParamsCompanyIdAndYear): Promise<PaidTrStatisticsAmqpDto[]> {
    return await this.tradeReceivableStatisticsService.calcPaidTradeReceivableVolumePerMonth(params.year, params.companyId);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_ALL_BY_PAYMENT_STATE)
  async findAllByPaymentStateAndCreditorId(@Payload() params: TRParamsCompanyIdAndPaymentState): Promise<TradeReceivableAmqpDto[]> {
    return await this.tradeReceivablesService.findTRByPaymentStateAndCreditorId(params);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_TR_STATISTICS_NOT_PAID)
  async getTradeReceivableNotPaidStatistics(@Payload() companyId: string): Promise<NotPaidTrStatisticsAmqpDto> {
    return await this.tradeReceivableStatisticsService.getTradeReceivablesNotPaidStatisticsByCompanyId(companyId);
  }
}
