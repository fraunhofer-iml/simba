import { TradeReceivableAmqpDto } from '@ap3/amqp';
import { TradeReceivablePrismaService } from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';
import { TradeReceivable } from '@prisma/client';

@Injectable()
export class TradeReceivablesService {
  private logger = new Logger(TradeReceivablesService.name);
  constructor(private readonly tradeReceivablePrismaService: TradeReceivablePrismaService) {}
  create(orderId: string): void {}

  async findAll(id: string): Promise<TradeReceivableAmqpDto[]> {
    this.logger.debug('requesting Tradereceivables of id : ', id);
    let tradeReceivables: TradeReceivable[] = [];
    let tradeReceivableDtos: TradeReceivableAmqpDto[] = [];
    if (id) {
      tradeReceivables = await this.tradeReceivablePrismaService.getAllTradeReceivablesById(id);
    } else {
      tradeReceivables = await this.tradeReceivablePrismaService.getAll();
    }
    for (let tr of tradeReceivables) {
      tradeReceivableDtos.push(TradeReceivableAmqpDto.fromPrismaEntity(tr));
    }
    return tradeReceivableDtos;
  }

  async findOne(id: string): Promise<TradeReceivableAmqpDto> {
    return TradeReceivableAmqpDto.fromPrismaEntity(await this.tradeReceivablePrismaService.getOneTradeReceivableById(id));
  }
}
