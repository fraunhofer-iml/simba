import { CreateTradeReceivableAMQPMock, TradeReceivablesAMQPMock } from '@ap3/amqp';
import {
  createTradeReceivableQuery,
  DatabaseModule,
  InvoiceSeed,
  PaymentStatesSeed,
  PrismaService,
  QueryTradeReceivableById,
  QueryTradeReceivablesByCreditorQuery,
  QueryTradeReceivablesByDebtorQuery,
  QueryTradeReceivablesByOrderQuery,
  TradeReceivablesSeed,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
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
    prismaTRSpy.mockResolvedValue(TradeReceivablesSeed);

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
    prismaTRSpy.mockResolvedValue(TradeReceivablesSeed);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[1]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal = await controller.findAllByDebtorId('pt0001');
    expect(prisma.tradeReceivable.findMany).toHaveBeenCalledWith(QueryTradeReceivablesByDebtorQuery);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByCreditorId: should return trade receivables by creditor id', async () => {
    const expectedReturn = TradeReceivablesAMQPMock;

    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findMany');
    prismaTRSpy.mockResolvedValue(TradeReceivablesSeed);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[1]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal = await controller.findAllByCreditorId('pt0002');
    expect(prisma.tradeReceivable.findMany).toHaveBeenCalledWith(QueryTradeReceivablesByCreditorQuery);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByOrderId: should return trade receivables by order id', async () => {
    const expectedReturn = TradeReceivablesAMQPMock;

    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findMany');
    prismaTRSpy.mockResolvedValue(TradeReceivablesSeed);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[1]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal = await controller.findAllByOrderId('o001');
    expect(prisma.tradeReceivable.findMany).toHaveBeenCalledWith(QueryTradeReceivablesByOrderQuery);
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
    expect(prisma.tradeReceivable.findUnique).toHaveBeenCalledWith(QueryTradeReceivableById);
    expect(expectedReturn).toEqual(retVal);
  });
});
