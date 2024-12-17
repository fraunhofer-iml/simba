import { CompanyIdAndInvoiceId, CompanyIdAndOrderId, CompanyIdAndPaymentState, InvoiceAmqpDto, InvoicesAmqpMock } from '@ap3/amqp';
import {
  CompaniesSeed,
  DatabaseModule,
  InvoiceIdQueryMock,
  InvoiceNFTPrismaMock,
  InvoicesByCreditorQueryMock,
  InvoicesByDebtorQueryMock,
  InvoicesByOrderQueryMock,
  InvoiceSeed,
  OrdersSeed,
  PaymentStatesEnum,
  PaymentStatesSeed,
  PrismaService,
  TradeReceivablesSeed,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let prisma: PrismaService;
  let prismaIVManySpy;

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
              findMany: jest.fn(),
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

    prismaIVManySpy = jest.spyOn(prisma.invoice, 'findMany');
    prismaIVManySpy.mockResolvedValue(InvoiceNFTPrismaMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll: should return all invoices', async () => {
    const expectedReturn = InvoicesAmqpMock;

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal = await controller.findAll(CompaniesSeed[0].id);
    expect(prisma.invoice.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByDebtorId: should return invoices by debtor id', async () => {
    const expectedReturn = InvoicesAmqpMock;

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal = await controller.findAllByDebtorId(InvoiceSeed[0].debtorId);
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(InvoicesByDebtorQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByCreditorId: should return invoices by creditor id', async () => {
    const expectedReturn = <InvoiceAmqpDto[]>InvoicesAmqpMock;

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const retVal: InvoiceAmqpDto[] = await controller.findAllByCreditorId(InvoiceSeed[0].creditorId);
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(InvoicesByCreditorQueryMock);
    expect(retVal).toEqual(expectedReturn);
  });

  it('findAllByOrderId: should return invoices by order id', async () => {
    const expectedReturn = InvoicesAmqpMock;

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);

    const params = new CompanyIdAndOrderId(InvoiceSeed[0].debtorId, OrdersSeed[0].id);
    const retVal = await controller.findAllByOrderId(params);
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(InvoicesByOrderQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOneById: should return invoices by id', async () => {
    const expectedReturn = InvoicesAmqpMock[0];
    prismaIVManySpy.mockResolvedValue([InvoiceNFTPrismaMock[0]]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);

    const retVal = await controller.findOneById(new CompanyIdAndInvoiceId(InvoiceSeed[0].debtorId, expectedReturn.id));
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(InvoiceIdQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByPaymentStateAndCreditorId: should return invoices', async () => {
    const expectedReturn = [InvoicesAmqpMock[0]];

    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue([TradeReceivablesSeed[0]]);

    prismaIVManySpy.mockResolvedValue([InvoiceNFTPrismaMock[0]]);
    const prismaPaymentStatusSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPaymentStatusSpy.mockResolvedValue([PaymentStatesSeed[1]]);

    const retVal = await controller.findAllByPaymentStateAndCreditorId(
      new CompanyIdAndPaymentState(CompaniesSeed[0].id, PaymentStatesEnum.PAID)
    );

    expect(prisma.$queryRaw).toHaveBeenCalled();
    expect(prisma.invoice.findMany).toHaveBeenCalled();
    expect(prisma.paymentStatus.findMany).toHaveBeenCalled();

    expect(expectedReturn).toEqual(retVal);
  });
});
