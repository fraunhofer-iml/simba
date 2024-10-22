import {CreateTradeReceivableDto, TradeReceivableDto} from '@ap3/api';
import {Controller, Get, Post, Param, Query, Body} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
@ApiTags('Trade-Receivables')
@ApiBearerAuth()
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
  @ApiBody({
    schema: {
      type:'object',
      properties:{
        debtorId:{type:'string'},
        nft:{type:'string'},
        value:{type:'number'},
        invoiceId:{type:'string'},
      }
    },
    required:true
  })
  @Post()
  async create(@Query('orderId') orderId: string, @Body() createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    return await this.tradeReceivableService.create(orderId, createTradeReceivableDto);
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
