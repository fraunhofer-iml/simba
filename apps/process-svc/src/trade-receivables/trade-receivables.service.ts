import {CreateTradeReceivableAmqpDto, TradeReceivableAmqpDto} from '@ap3/amqp';
import { TradeReceivablePrismaService } from '@ap3/database';
import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import { TradeReceivable } from '@prisma/client';
import util from "node:util";

@Injectable()
export class TradeReceivablesService {
  private logger = new Logger(TradeReceivablesService.name);
  constructor(private readonly tradeReceivablePrismaService: TradeReceivablePrismaService) {}

  async create(createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    this.logger.verbose(`create trade receivable ${util.inspect(createTradeReceivableDto)}`);
    try{
      const createTradeReceivable = createTradeReceivableDto.toPrismaCreateEntity();
      const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.createTradeReceivable(createTradeReceivable);
      if(tradeReceivable){
        return TradeReceivableAmqpDto.fromPrismaEntity(tradeReceivable);
      } else {
        throw new InternalServerErrorException(`Could not create trade receivable ${util.inspect(createTradeReceivableDto)}`);
      }
    }catch (e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findAll(id: string): Promise<TradeReceivableAmqpDto[]> {
    this.logger.verbose('requesting Tradereceivables of id : ', id);
    let tradeReceivables: TradeReceivable[] = [];
    const tradeReceivableDtos: TradeReceivableAmqpDto[] = [];
    if (id) {
      tradeReceivables = await this.tradeReceivablePrismaService.getAllTradeReceivablesById(id);
    } else {
      tradeReceivables = await this.tradeReceivablePrismaService.getAll();
    }
    for (const tr of tradeReceivables) {
      tradeReceivableDtos.push(TradeReceivableAmqpDto.fromPrismaEntity(tr));
    }
    return tradeReceivableDtos;
  }

  async findOne(id: string): Promise<TradeReceivableAmqpDto> {
    return TradeReceivableAmqpDto.fromPrismaEntity(await this.tradeReceivablePrismaService.getOneTradeReceivableById(id));
  }
}
