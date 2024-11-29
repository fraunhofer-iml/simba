import util from 'node:util';
import { CreateTradeReceivableAmqpDto, TradeReceivableAmqpDto } from '@ap3/amqp';
import { TradeReceivablePrismaService } from '@ap3/database';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PaymentStatus, TradeReceivable } from '@prisma/client';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);

  constructor(
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    this.logger.verbose(`create trade receivable ${util.inspect(createTradeReceivableDto)}`);
    try {
      const createTradeReceivable = createTradeReceivableDto.toPrismaCreateEntity();
      const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.createTradeReceivable(createTradeReceivable);
      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tradeReceivable.id);

      if (tradeReceivable) {
        return TradeReceivableAmqpDto.fromPrismaEntity(tradeReceivable, trStates);
      } else {
        throw new InternalServerErrorException(`Could not create trade receivable ${util.inspect(createTradeReceivableDto)}`);
      }
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
