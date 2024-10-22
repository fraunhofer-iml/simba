import { BrokerAmqp } from '@ap3/amqp';
import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';
import { OrdersModule } from './orders.module';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrdersModule, new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker()],
      providers: [OrdersService, ProductsService, OffersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
