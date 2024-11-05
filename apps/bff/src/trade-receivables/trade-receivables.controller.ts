import { CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
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
        debtorId: { type: 'string' },
        nft: { type: 'string' },
        value: { type: 'number' },
        invoiceId: { type: 'string' },
      },
    },
    required: true,
  })
  @Post()
  async create(@Query('orderId') orderId: string, @Body() createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    return await this.tradeReceivableService.create(orderId, createTradeReceivableDto);
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
      'Get all trade receivables corresponding to a debtor, a creditor or a order. ' +
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
}
