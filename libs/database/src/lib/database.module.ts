import { Module } from '@nestjs/common';
import { CompanyPrismaService, ProductPrismaService } from './master-data-svc';
import { PrismaService } from './prisma.service';
import {
  InvoicePrismaAdapterService,
  InvoicePrismaService,
  OfferPrismaService,
  OrderPrismaService,
  QueryBuilderHelperService,
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
    QueryBuilderHelperService,
    InvoicePrismaAdapterService,
  ],
  exports: [
    OrderPrismaService,
    OfferPrismaService,
    ProductPrismaService,
    CompanyPrismaService,
    TradeReceivablePrismaService,
    InvoicePrismaService,
    ServiceProcessPrismaService,
    InvoicePrismaAdapterService,
  ],
})
export class DatabaseModule {}
