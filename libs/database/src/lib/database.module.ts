import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OrderPrismaService } from './process-entities/order-prisma.service';
import {OfferPrismaService} from "./process-entities/offer-prisma.service";
import {ProductPrismaService} from "./process-entities/product-prisma.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, OrderPrismaService, OfferPrismaService, ProductPrismaService],
  exports: [OrderPrismaService, OfferPrismaService, ProductPrismaService],
})
export class DatabaseModule {}
