import { DatabaseModule } from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { TradeReceivablesService } from './trade-receivables.service';

describe('TradeReceivablesService', () => {
  let service: TradeReceivablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TradeReceivablesService],
    }).compile();

    service = module.get<TradeReceivablesService>(TradeReceivablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
