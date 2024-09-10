import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OrderPrismaService } from './process-entities/order-prisma.service';
import {OfferPrismaService} from "./process-entities/offer-prisma.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, OrderPrismaService, OfferPrismaService],
  exports: [OrderPrismaService, OfferPrismaService],
})
export class DatabaseModule {}
