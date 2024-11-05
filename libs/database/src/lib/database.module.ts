import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { InvoicePrismaService } from './process-services/invoice-prisma.service';
import { OfferPrismaService } from './process-services/offer-prisma.service';
import { OrderPrismaService } from './process-services/order-prisma.service';
import { ProductPrismaService } from './process-services/product-prisma.service';
import { ServiceProcessPrismaService } from './process-services/service-process-prisma.service';
import { TradeReceivablePrismaService } from './process-services/trade-receivable-prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    OrderPrismaService,
    OfferPrismaService,
    ProductPrismaService,
    TradeReceivablePrismaService,
    InvoicePrismaService,
    ServiceProcessPrismaService,
  ],
  exports: [
    OrderPrismaService,
    OfferPrismaService,
    ProductPrismaService,
    TradeReceivablePrismaService,
    InvoicePrismaService,
    ServiceProcessPrismaService,
  ],
})
export class DatabaseModule {}
