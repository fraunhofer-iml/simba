import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OrderPrismaService } from './process-entities/order-prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, OrderPrismaService],
  exports: [OrderPrismaService],
})
export class DatabaseModule {}
