import { DatabaseModule } from '@ap3/database';
import { Module } from '@nestjs/common';
import { OrderManagementModule } from '../shared/order-management/order-management.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [DatabaseModule, OrderManagementModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
