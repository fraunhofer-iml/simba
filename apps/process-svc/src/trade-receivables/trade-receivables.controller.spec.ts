import {
  CreateTradeReceivableAMQPMock,
  NotPaidTrStatisticsAmqpDto,
  NotPaidTrStatisticsAmqpMock,
  PaidTrStatisticsAmqpMock,
  TradeReceivableAmqpDto,
  TradeReceivablesAMQPMock,
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
    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValue(InvoiceSeed[0]);
    const prismaPaymentStatusSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPaymentStatusSpy.mockResolvedValue([PaymentStatesSeed[0], PaymentStatesSeed[1]]);

    const expectedReturn = TradeReceivablesAMQPMock[0];
    const retVal = await controller.create(CreateTradeReceivableAMQPMock);

    expect(prisma.tradeReceivable.create).toHaveBeenCalledWith({ data: createTradeReceivableQuery });
    expect(prisma.tradeReceivable.create).toBeCalledTimes(1);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAll: should return all trs', async () => {
    const expectedReturn = TradeReceivablesAMQPMock;
    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findMany');
    prismaTRSpy.mockResolvedValue([TradeReceivablesSeed[0], TradeReceivablesSeed[1]]);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[1]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal = await controller.findAll();
    expect(prisma.tradeReceivable.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByDebtorId: should return trade receivables by debtor id', async () => {
    const expectedReturn = TradeReceivablesAMQPMock;

    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findMany');
    prismaTRSpy.mockResolvedValue([TradeReceivablesSeed[0], TradeReceivablesSeed[1]]);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[1]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal = await controller.findAllByDebtorId('pt0001');
    expect(prisma.tradeReceivable.findMany).toHaveBeenCalledWith(TradeReceivablesByDebtorQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByCreditorId: should return trade receivables by creditor id', async () => {
    const expectedReturn = <TradeReceivableAmqpDto[]>TradeReceivablesAMQPMock;

    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findMany');
    prismaTRSpy.mockResolvedValue([TradeReceivablesSeed[0], TradeReceivablesSeed[1]]);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[1]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal: TradeReceivableAmqpDto[] = await controller.findAllByCreditorId(InvoiceSeed[0].creditorId);
    expect(prisma.tradeReceivable.findMany).toHaveBeenCalledWith(TradeReceivablesByCreditorQueryMock);
    expect(retVal).toEqual(expectedReturn);
  });

  it('findAllByOrderId: should return trade receivables by order id', async () => {
    const expectedReturn = TradeReceivablesAMQPMock;

    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findMany');
    prismaTRSpy.mockResolvedValue([TradeReceivablesSeed[0], TradeReceivablesSeed[1]]);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[1]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal = await controller.findAllByOrderId('o001');
    expect(prisma.tradeReceivable.findMany).toHaveBeenCalledWith(TradeReceivablesByOrderQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOneById: should return trade receivables by id', async () => {
    const expectedReturn = TradeReceivablesAMQPMock[0];

    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findUnique');
    prismaTRSpy.mockResolvedValue(TradeReceivablesSeed[0]);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);

    const retVal = await controller.findOneById(expectedReturn.id);
    expect(prisma.tradeReceivable.findUnique).toHaveBeenCalledWith(TradeReceivableByIdQueryMock);
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

  it('findAllByPaymentStateAndCreditorId: should return trade receivables', async () => {
    const expectedReturn = [TradeReceivablesAMQPMock[0]];

    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue([TradeReceivablesSeed[0]]);
    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValue(InvoiceSeed[0]);
    const prismaPaymentStatusSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPaymentStatusSpy.mockResolvedValue([PaymentStatesSeed[1]]);

    const retVal = await controller.findAllByPaymentStateAndCreditorId(
      new TRParamsCompanyIdAndPaymentState(CompaniesSeed[0].id, PaymentStatesEnum.PAID)
    );

    expect(prisma.$queryRaw).toHaveBeenCalled();
    expect(prisma.invoice.findUnique).toHaveBeenCalled();
    expect(prisma.paymentStatus.findMany).toHaveBeenCalled();

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
