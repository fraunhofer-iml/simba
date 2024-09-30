import { Injectable, Logger } from '@nestjs/common';
import { TradeReceivable } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TradeReceivablePrismaService {
  private logger = new Logger(TradeReceivablePrismaService.name);
  constructor(private prismaService: PrismaService) {}

  async createTradeReceivable() {}
  async getAll(): Promise<TradeReceivable[]> {
    this.logger.debug('Returning all Trade Receivables ');
    return this.prismaService.tradeReceivable.findMany();
  }
  async getAllTradeReceivablesById(debitorId: string): Promise<TradeReceivable[]> {
    this.logger.debug('Returning all Trade Receivables for debitor : ', debitorId);
    return this.prismaService.tradeReceivable.findMany({ where: { debitorId: { equals: String(debitorId) } } });
  }
  async getOneTradeReceivableById(tRId: string) {
    return this.prismaService.tradeReceivable.findUnique({ where: { id: tRId } });
  }
}
