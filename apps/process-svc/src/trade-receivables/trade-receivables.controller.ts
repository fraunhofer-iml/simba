import {CreateTradeReceivableAmqpDto, TradeReceivableAmqpDto, TradeReceivableMessagePatterns} from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
export class TradeReceivablesController {
  constructor(private readonly tradeReceivablesService: TradeReceivablesService) {}

  @MessagePattern(TradeReceivableMessagePatterns.CREATE)
  async create(@Payload() createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    return await this.tradeReceivablesService.create(createTradeReceivableDto);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_ALL)
  async findAll(@Payload() userId: string): Promise<TradeReceivableAmqpDto[]> {
    return this.tradeReceivablesService.findAll(userId);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_BY_ID)
  async findOne(@Payload() orderId: string): Promise<TradeReceivableAmqpDto> {
    return this.tradeReceivablesService.findOne(orderId);
  }
}
