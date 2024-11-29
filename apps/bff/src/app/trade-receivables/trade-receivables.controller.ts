import { PaidTrStatisticsAmqpDto } from '@ap3/amqp';
import { CreateTradeReceivableDto, TradeReceivableDto, UnpaidTrStatisticsDto } from '@ap3/api';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
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
    description: 'Get a statistic for all trade receivables paid in a given year, grouped by month. ',
  })
  @ApiQuery({
    name: 'year',
    type: Number,
    required: true,
  })
  @Get('/statistics/paid')
  async getStatisticPaidTradePerMonth(@Query('year') year: number): Promise<PaidTrStatisticsAmqpDto[]> {
    return await this.tradeReceivableService.getStatisticPaidTRPerMonth(year);
  }

  @ApiOperation({
    description: 'Get trade receivables statistics by companyId.',
  })
  @Get('/statistics/unpaid')
  async getStatisticUnpaidTrade(): Promise<UnpaidTrStatisticsDto> {
    return await this.tradeReceivableService.getStatisticNotPaidTRPerMonth();
  }
}
