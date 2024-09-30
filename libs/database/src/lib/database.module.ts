import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OfferPrismaService } from './process-entities/offer-prisma.service';
import { OrderPrismaService } from './process-entities/order-prisma.service';
import { ProductPrismaService } from './process-entities/product-prisma.service';
import { TradeReceivablePrismaService } from './process-entities/trade-receivable-prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, OrderPrismaService, OfferPrismaService, ProductPrismaService, TradeReceivablePrismaService],
  exports: [OrderPrismaService, OfferPrismaService, ProductPrismaService, TradeReceivablePrismaService],
})
export class DatabaseModule {}
