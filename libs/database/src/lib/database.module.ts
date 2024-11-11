import { Module } from '@nestjs/common';
import { CompanyPrismaService } from './master-data-svc/company-prisma.service';
import { ProductPrismaService } from './master-data-svc/product-prisma.service';
import { PrismaService } from './prisma.service';
import { InvoicePrismaService } from './process-svc/invoice-prisma.service';
import { OfferPrismaService } from './process-svc/offer-prisma.service';
import { OrderPrismaService } from './process-svc/order-prisma.service';
import { ServiceProcessPrismaService } from './process-svc/service-process-prisma.service';
import { TradeReceivablePrismaService } from './process-svc/trade-receivable-prisma.service';

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
