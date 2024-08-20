import { Controller, Get, Post, Param } from '@nestjs/common';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
export class TradeReceivablesController {
  constructor(private readonly tradeReceivableService: TradeReceivablesService) {}

  @Post(':orderId')
  create(@Param('orderId') orderId: string) {
    return this.tradeReceivableService.create(orderId);
  }

  @Get()
  findAll() {
    return this.tradeReceivableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradeReceivableService.findOne(id);
  }
}
