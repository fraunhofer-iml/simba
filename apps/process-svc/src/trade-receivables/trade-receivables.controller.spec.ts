import { DatabaseModule } from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

describe('TradeReceivablesController', () => {
  let controller: TradeReceivablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [TradeReceivablesController],
      providers: [TradeReceivablesService],
    }).compile();

    controller = module.get<TradeReceivablesController>(TradeReceivablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
