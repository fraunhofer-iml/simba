import { Controller, Get, Post, Param } from '@nestjs/common';
import { TradeReceivablesService } from './trade-receivables.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('trade-receivables')
export class TradeReceivablesController {
  constructor(private readonly tradeReceivableService: TradeReceivablesService) {}

  @ApiParam({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the corresponding order a trade-receivable should be created for.',
    required: true,
  })
  @Post(':orderId')
  create(@Param('orderId') orderId: string) {
    return this.tradeReceivableService.create(orderId);
  }

  @Get()
  findAll() {
    return this.tradeReceivableService.findAll();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the trade-receivable.',
    required: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradeReceivableService.findOne(id);
  }
}
