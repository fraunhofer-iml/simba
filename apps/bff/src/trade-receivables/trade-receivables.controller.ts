import { PaidTrStatisticsAmqpDto } from '@ap3/amqp';
import { CreateTradeReceivableDto, TradeReceivableDto, UnpaidTrStatisticsDto } from '@ap3/api';
import { PaymentStatesEnum } from '@ap3/database';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
@ApiTags('Trade Receivables')
@ApiBearerAuth()
export class TradeReceivablesController {
  constructor(private readonly tradeReceivableService: TradeReceivablesService) {}

  @ApiOperation({
    description: 'Create new trade receivables.',
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the order of the trade-receivable.',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nft: { type: 'string' },
        invoiceId: { type: 'string' },
      },
    },
    required: true,
  })
  @Post()
  async create(@Query('orderId') orderId: string, @Body() createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    return await this.tradeReceivableService.create(createTradeReceivableDto);
  }

  @ApiOperation({
    description: 'Get trade receivables by id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the corresponding trade-receivables.',
    required: true,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TradeReceivableDto> {
    return await this.tradeReceivableService.findOne(id);
  }

  @ApiOperation({
    description:
      'Get all trade receivables corresponding to a debtor, a creditor or an order. ' +
      'It is currently only possible to restrict the query to one query parameter',
  })
  @ApiQuery({
    name: 'debtorId',
    type: String,
    description: 'Identifying debtor id; Required to identify the corresponding trade-receivables of a specific debtor.',
    required: false,
  })
  @ApiQuery({
    name: 'creditorId',
    type: String,
    description: 'Identifying creditor id; Required to identify the corresponding trade-receivables of a specific creditor.',
    required: false,
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the corresponding trade-receivables of a specific order.',
    required: false,
  })
  @Get()
  async findAll(
    @Query('debtorId') debtorId: string,
    @Query('creditorId') creditorId: string,
    @Query('orderId') orderId: string
  ): Promise<TradeReceivableDto[]> {
    return await this.tradeReceivableService.findAll(debtorId, creditorId, orderId);
  }

  @ApiOperation({
    description: 'Get all trade receivables corresponding to a creditor and a specific financial state ',
  })
  @ApiQuery({
    name: 'creditorId',
    type: String,
    description: 'Identifying creditor id; Required to identify the corresponding trade-receivables of a specific creditor.',
    required: false,
  })
  @ApiQuery({
    name: 'financialState',
    type: String,
    enum: PaymentStatesEnum,
    description: 'Identifying string; Required to identify the corresponding trade-receivables of a specific payment state.',
    required: false,
  })
  @Get('/states/financial')
  async findAllByPaymentState(
    @Query('creditorId') creditorId: string,
    @Query('financialState') paymentState: string
  ): Promise<TradeReceivableDto[]> {
    return await this.tradeReceivableService.findAllByCreditorAndPaymentState(creditorId, paymentState);
  }

  @ApiOperation({
    description: 'Get a statistic for all trade receivables paid in a given year, grouped by month. ',
  })
  @ApiQuery({
    name: 'year',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'creditorId',
    type: String,
    description: 'Identifying creditor id; Required to identify the corresponding trade-receivables of a specific creditor.',
    required: true,
  })
  @Get('/statistics/paid')
  async getStatisticPaidTradePerMonth(
    @Query('year') year: number,
    @Query('creditorId') creditorId: string
  ): Promise<PaidTrStatisticsAmqpDto[]> {
    return await this.tradeReceivableService.getStatisticPaidTRPerMonth(year, creditorId);
  }

  @ApiOperation({
    description: 'Get trade receivables statistics by companyId.',
  })
  @ApiQuery({
    name: 'creditorId',
    type: String,
    description: 'Identifying creditor id; Required to identify the corresponding trade-receivables of a specific creditor.',
    required: true,
  })
  @Get('/statistics/unpaid')
  async getStatisticUnpaidTrade(@Query('creditorId') creditorId: string): Promise<UnpaidTrStatisticsDto> {
    return await this.tradeReceivableService.getStatisticNotPaidTRPerMonth(creditorId);
  }
}
