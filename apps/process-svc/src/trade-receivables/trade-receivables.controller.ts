import { TradeReceivableMessagePatterns } from '@ap3/amqp';
import { CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
export class TradeReceivablesController {
  constructor(private readonly tradeReceivablesService: TradeReceivablesService) {}

  @MessagePattern(TradeReceivableMessagePatterns.CREATE)
  async create(@Payload() createDto: CreateTradeReceivableDto): Promise<boolean> {
    return this.tradeReceivablesService.create(createDto);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_ALL)
  async findAll(@Payload() userId: string): Promise<TradeReceivableDto[]> {
    return this.tradeReceivablesService.findAll(userId);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_BY_ID)
  async findOne(@Payload() orderId: string): Promise<TradeReceivableDto> {
    return this.tradeReceivablesService.findOne(orderId);
  }
}
