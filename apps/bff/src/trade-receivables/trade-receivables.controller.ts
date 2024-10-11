import { TradeReceivableDto } from '@ap3/api';
import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
@ApiTags('Trade-Receivables')
export class TradeReceivablesController {
  constructor(private readonly tradeReceivableService: TradeReceivablesService) {}

  @ApiOperation({
    description: 'Create new Trade-Receivable.',
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the order of the trade-receivable.',
    required: true,
  })
  @Post()
  async create(@Query('orderId') orderId: string): Promise<void> {
    return await this.tradeReceivableService.create(orderId);
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the corresponding trade-receivables of a participant.',
    required: true,
  })
  @Get(':id')
  async findAll(@Param('id') id: string): Promise<TradeReceivableDto[]> {
    return await this.tradeReceivableService.findAll(id);
  }
}
