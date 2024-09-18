import { Controller, Get, Post, Param } from '@nestjs/common';
import { TradeReceivablesService } from './trade-receivables.service';
import { ApiParam } from '@nestjs/swagger';
import {TradeReceivableDto} from "@ap3/api";

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
  async create(@Param('orderId') orderId: string): Promise<void> {
    return await this.tradeReceivableService.create(orderId);
  }

  @Get()
  async findAll(): Promise<TradeReceivableDto[]> {
    return await this.tradeReceivableService.findAll();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the trade-receivable.',
    required: true,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TradeReceivableDto> {
    return this.tradeReceivableService.findOne(id);
  }
}
