import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersModule } from './orders.module';
import { BrokerAmqp } from '@ap3/amqp';
import { DtoConversionService } from '../shared/dto-conversion.service';
import { ProductsService } from '../products/products.service';
import { OffersService } from '../offers/offers.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrdersModule, new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker()],
      providers: [OrdersService, DtoConversionService,ProductsService, OffersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
