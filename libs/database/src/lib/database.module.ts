import { Module } from '@nestjs/common';
import { CompanyPrismaService, ProductPrismaService } from './master-data-svc';
import { PrismaService } from './prisma.service';
import {
  InvoicePrismaService,
  OfferPrismaService,
  OrderPrismaService,
  ServiceProcessPrismaService,
  TradeReceivablePrismaService,
} from './process-svc';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    OrderPrismaService,
    OfferPrismaService,
    ProductPrismaService,
    CompanyPrismaService,
    TradeReceivablePrismaService,
    InvoicePrismaService,
    ServiceProcessPrismaService,
  ],
  exports: [
    OrderPrismaService,
    OfferPrismaService,
    ProductPrismaService,
    CompanyPrismaService,
    TradeReceivablePrismaService,
    InvoicePrismaService,
    ServiceProcessPrismaService,
  ],
})
export class DatabaseModule {}
