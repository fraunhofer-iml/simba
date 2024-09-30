import { CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
@ApiTags('Trade-Receivables')
export class TradeReceivablesController {
  constructor(private readonly tradeReceivableService: TradeReceivablesService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {},
    },
    required: true,
  })
  @Post()
  async create(@Body() createDto: CreateTradeReceivableDto): Promise<void> {
    return await this.tradeReceivableService.create(createDto);
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
