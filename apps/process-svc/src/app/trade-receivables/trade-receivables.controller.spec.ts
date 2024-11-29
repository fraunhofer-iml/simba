import {
  CreateTradeReceivableAMQPMock,
  InvoiceAmqpDto,
  InvoicesAmqpMock,
  NotPaidTrStatisticsAmqpDto,
  NotPaidTrStatisticsAmqpMock,
  PaidTrStatisticsAmqpMock,
  TRParamsCompanyIdAndPaymentState,
  TRParamsCompanyIdAndYear,
} from '@ap3/amqp';
import { UnpaidTradeReceivableStatisticsMock } from '@ap3/api';
import {
  AggregationSumNovember,
  AggregationSumSeptember,
  CompaniesSeed,
  createTradeReceivableQuery,
  DatabaseModule,
  DueInvoiceCount,
  InvoiceSeed,
  PaidInvoiceIdsNovember,
  PaidInvoiceIdsSeptember,
  PaidOnTimeInvoiceCount,
  PaymentStatesEnum,
  PaymentStatesSeed,
  PrismaService,
  TradeReceivableByIdQueryMock,
  TradeReceivablePaymentStatusCountMock,
  TradeReceivablesByCreditorQueryMock,
  TradeReceivablesByDebtorQueryMock,
  TradeReceivablesByOrderQueryMock,
  TradeReceivablesSeed,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { TradeReceivableAMQPMock } from '../../../../../libs/amqp/src/lib/dtos/process-svc/trade-receivable/mocks/trade-receivable-amqp.mock';
import { TradeReceivablesStatisticsService } from './trade-receivable-statistics.service';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

describe('OfferController', () => {
  let controller: TradeReceivablesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [TradeReceivablesController],
      providers: [
        TradeReceivablesService,
        TradeReceivablesStatisticsService,
        {
          provide: PrismaService,
          useValue: {
            tradeReceivable: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            paymentStatus: {
              findMany: jest.fn(),
            },
            invoice: {
              findUnique: jest.fn(),
              aggregate: jest.fn(),
            },
            $queryRaw: jest.fn(),
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
    expect(prisma.tradeReceivable.create).toBeCalledTimes(1);
    expect(expectedReturn).toEqual(retVal);
  });

  it('calcPaidTradeReceivableVolumePerMonth: should create a statistic about paid and due trade receivables', async () => {
    const expectedReturn = PaidTrStatisticsAmqpMock;

    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(PaidInvoiceIdsSeptember)
      .mockResolvedValueOnce(PaidInvoiceIdsNovember)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    prismaRawSpy.mockResolvedValueOnce(DueInvoiceCount);

    prismaRawSpy.mockResolvedValueOnce(PaidOnTimeInvoiceCount);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'aggregate');
    prismaInvoiceSpy.mockResolvedValueOnce(AggregationSumSeptember).mockResolvedValueOnce(AggregationSumNovember);

    const retVal = await controller.calcPaidTradeReceivableVolumePerMonth(new TRParamsCompanyIdAndYear(CompaniesSeed[0].id, 2024));
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllOverdueByCreditorId: should return outstanding trade receivables', async () => {
    const expectedReturn = NotPaidTrStatisticsAmqpMock;

    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue(TradeReceivablePaymentStatusCountMock);

    const retVal = await controller.getTradeReceivableNotPaidStatistics(CompaniesSeed[0].id);

    expect(prisma.$queryRaw).toHaveBeenCalled();

    expect(expectedReturn).toEqual(retVal);
  });
});
