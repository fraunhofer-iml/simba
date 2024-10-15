import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {Prisma, TradeReceivable} from '@prisma/client';
import {PrismaService} from '../prisma.service';
import util from "node:util";

@Injectable()
export class TradeReceivablePrismaService {
  private logger = new Logger(TradeReceivablePrismaService.name);
  constructor(private prismaService: PrismaService) {}

  async createTradeReceivable(data: Prisma.TradeReceivableCreateInput): Promise<TradeReceivable | null> {
    this.logger.verbose(`Insert new Trade Receivable ${data}`);
    try {
      return await this.prismaService.tradeReceivable.create({data});
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getAll(): Promise<TradeReceivable[]> {
    this.logger.verbose('Returning all Trade Receivables ');
    return this.prismaService.tradeReceivable.findMany();
  }

  async getAllTradeReceivablesById(debtorId: string): Promise<TradeReceivable[]> {
    this.logger.verbose('Returning all Trade Receivables for debitor : ', debtorId);
    return this.prismaService.tradeReceivable.findMany({
      where: {
        debtorId: {
          equals: String(debtorId)
        }
      }
    });
  }
  async getOneTradeReceivableById(tRId: string): Promise<TradeReceivable> {
    this.logger.verbose("Return trade receivable by id from database");
    try{
      const tradeReceivable = await this.prismaService.tradeReceivable.findUnique({
        where: { id: tRId }
      });
      if(!tradeReceivable){
        throw new NotFoundException(`Trade receivable with id ${tRId} was not found in database.`);
      }
      return tradeReceivable;
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
