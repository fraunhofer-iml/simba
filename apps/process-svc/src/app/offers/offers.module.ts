import { DatabaseModule } from '@ap3/database';
import { Module } from '@nestjs/common';
import { OrderManagementModule } from '../shared/order-management/order-management.module';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  imports: [DatabaseModule, OrderManagementModule],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService],
})
export class OffersModule {}
