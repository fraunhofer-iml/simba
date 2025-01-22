import { CreateTradeReceivableAMQPMock, TradeReceivableAMQPMock } from '@ap3/amqp';
import {
  createTradeReceivableQuery,
  DatabaseModule,
  PaymentStatesSeed,
  PrismaService,
  QueryBuilderHelperService,
  TradeReceivablesSeed,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesStatisticsService } from '../invoices/statistics/invoices-statistics.service';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

describe('TradeReceivablesController', () => {
  let controller: TradeReceivablesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [TradeReceivablesController],
      providers: [
        QueryBuilderHelperService,
        TradeReceivablesService,
        InvoicesStatisticsService,
        {
          provide: PrismaService,
          useValue: {
            tradeReceivable: {
              create: jest.fn(),
            },
            paymentStatus: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<TradeReceivablesController>(TradeReceivablesController) as TradeReceivablesController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create: should create new tr for an invoice', async () => {
    const prismaTradeReceivableSpy = jest.spyOn(prisma.tradeReceivable, 'create');
    prismaTradeReceivableSpy.mockResolvedValue(TradeReceivablesSeed[0]);
    const prismaPaymentStatusSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPaymentStatusSpy.mockResolvedValue([PaymentStatesSeed[0], PaymentStatesSeed[1]]);

    const expectedReturn = TradeReceivableAMQPMock[0];
    const retVal = await controller.create(CreateTradeReceivableAMQPMock);

    expect(prisma.tradeReceivable.create).toHaveBeenCalledWith({ data: createTradeReceivableQuery });
    expect(prisma.tradeReceivable.create).toHaveBeenCalledTimes(1);
    expect(expectedReturn).toEqual(retVal);
  });
});
