import { Test, TestingModule } from '@nestjs/testing';
import { DtoConversionService } from './dto-conversion.service';
import { ProductDto } from '@ap3/api';
import { ProductsService } from '../products/products.service';
import { Client, ClientProxy } from '@nestjs/microservices';
import { BrokerAmqp } from '@ap3/amqp';
import { OffersService } from '../offers/offers.service';

describe('DtoConversionService', () => {
  let service: DtoConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker()],
      providers: [DtoConversionService, ProductsService, OffersService ],
    }).compile();

    service = module.get<DtoConversionService>(DtoConversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
