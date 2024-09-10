import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from './offers.service';
import {DatabaseModule} from "@ap3/database";

describe('OfferService', () => {
  let service: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [OffersService],
    }).compile();

    service = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
