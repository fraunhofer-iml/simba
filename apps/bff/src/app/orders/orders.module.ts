import { BrokerAmqp } from '@ap3/amqp';
import { ConfigurationModule } from '@ap3/config';
import { Module } from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';
import { ServiceProcessService } from '../service-process/service-process.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker(), ConfigurationModule],
  controllers: [OrdersController],
  providers: [OrdersService, OffersService, ProductsService, CompaniesService, ServiceProcessService],
})
export class OrdersModule {}
