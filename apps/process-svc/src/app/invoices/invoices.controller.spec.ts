import { CompanyIdAndInvoiceId, CompanyIdAndPaymentState, InvoiceAmqpDto, InvoicesAmqpMock } from '@ap3/amqp';
import {
  CompaniesSeed,
  DatabaseModule,
  InvoiceSeed,
  PaymentStatesEnum,
  PaymentStatesSeed,
  PrismaService,
  TradeReceivableByInvoiceIdQueryMock,
  TradeReceivablesByCreditorQueryMock,
  TradeReceivablesByDebtorQueryMock,
  TradeReceivablesByOrderQueryMock,
  TradeReceivablesSeed,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [InvoicesController],
      providers: [
        InvoicesService,
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
    controller = module.get<InvoicesController>(InvoicesController) as InvoicesController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;

    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findMany');
    prismaTRSpy.mockResolvedValue([TradeReceivablesSeed[0], TradeReceivablesSeed[1]]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll: should return all invoices', async () => {
    const expectedReturn = InvoicesAmqpMock;

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

  it('findAllByDebtorId: should return invoices by debtor id', async () => {
    const expectedReturn = InvoicesAmqpMock;

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

  it('findAllByCreditorId: should return invoices by creditor id', async () => {
    const expectedReturn = <InvoiceAmqpDto[]>InvoicesAmqpMock;

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[1]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal: InvoiceAmqpDto[] = await controller.findAllByCreditorId(InvoiceSeed[0].creditorId);
    expect(prisma.tradeReceivable.findMany).toHaveBeenCalledWith(TradeReceivablesByCreditorQueryMock);
    expect(retVal).toEqual(expectedReturn);
  });

  it('findAllByOrderId: should return invoices by order id', async () => {
    const expectedReturn = InvoicesAmqpMock;

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

  it('findOneById: should return invoices by id', async () => {
    const expectedReturn = InvoicesAmqpMock[0];

    const prismaTRSpy = jest.spyOn(prisma.tradeReceivable, 'findUnique');
    prismaTRSpy.mockResolvedValue(TradeReceivablesSeed[0]);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[0]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);

    const retVal = await controller.findOneById(new CompanyIdAndInvoiceId(CompaniesSeed[1].id, expectedReturn.id));
    expect(prisma.tradeReceivable.findUnique).toHaveBeenCalledWith(TradeReceivableByInvoiceIdQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByPaymentStateAndCreditorId: should return invoices', async () => {
    const expectedReturn = [InvoicesAmqpMock[0]];

    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue([TradeReceivablesSeed[0]]);
    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findUnique');
    prismaInvoiceSpy.mockResolvedValue(InvoiceSeed[0]);
    const prismaPaymentStatusSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPaymentStatusSpy.mockResolvedValue([PaymentStatesSeed[1]]);

    const retVal = await controller.findAllByPaymentStateAndCreditorId(
      new CompanyIdAndPaymentState(CompaniesSeed[0].id, PaymentStatesEnum.PAID)
    );

    expect(prisma.$queryRaw).toHaveBeenCalled();
    expect(prisma.invoice.findUnique).toHaveBeenCalled();
    expect(prisma.paymentStatus.findMany).toHaveBeenCalled();

    expect(expectedReturn).toEqual(retVal);
  });
});
