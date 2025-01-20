import { AllInvoicesFilter, CompanyIdAndInvoiceId, CompanyIdAndPaymentState, InvoiceAmqpDto, InvoicesAmqpMock } from '@ap3/amqp';
import { InvoiceMocks } from '@ap3/api';
import { ConfigurationModule } from '@ap3/config';
import {
  CompaniesSeed,
  DatabaseModule,
  InvoiceForZugferdMock,
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
import { S3Module, S3Service } from '@ap3/s3';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { InvoicesZugferdService } from './zugferd/invoices-zugferd.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let prisma: PrismaService;
  let minioClientMock: Partial<Client>;
  let prismaIVManySpy;
  let prismaPSSpy;

  beforeEach(async () => {
    minioClientMock = {
      putObject: jest.fn().mockResolvedValue('mock-put-object-result'),
      getObject: jest.fn().mockResolvedValue('mock-fetch-result'),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, S3Module, ConfigurationModule],
      controllers: [InvoicesController],
      providers: [
        InvoicesService,
        InvoicesZugferdService,
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
              findUniqueOrThrow: jest.fn(),
            },
            $queryRaw: jest.fn(),
          },
        },
        S3Service,
        {
          provide: MINIO_CONNECTION,
          useValue: minioClientMock,
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<InvoicesController>(InvoicesController) as InvoicesController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;

    prismaIVManySpy = jest.spyOn(prisma.invoice, 'findMany');
    prismaIVManySpy.mockResolvedValue(InvoiceNFTPrismaMock);

    prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[2], PaymentStatesSeed[3]]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll: should return all invoices', async () => {
    const expectedReturn = InvoicesAmqpMock;
    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue([TradeReceivablesSeed[0], TradeReceivablesSeed[1]]);

    const params = new AllInvoicesFilter(InvoiceSeed[0].creditorId, InvoiceSeed[0].debtorId, PaymentStatesEnum.PAID);
    const retVal = await controller.findAll(params);
    expect(prisma.invoice.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByDebtorId: should return invoices by debtor id', async () => {
    const expectedReturn = InvoicesAmqpMock;

    const retVal = await controller.findAllByDebtorId(InvoiceSeed[0].debtorId);
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(InvoicesByDebtorQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByCreditorId: should return invoices by creditor id', async () => {
    const expectedReturn = <InvoiceAmqpDto[]>InvoicesAmqpMock;

    const retVal: InvoiceAmqpDto[] = await controller.findAllByCreditorId(InvoiceSeed[0].creditorId);
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(InvoicesByCreditorQueryMock);
    expect(retVal).toEqual(expectedReturn);
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

  it('createAndUploadZugferdPDF: should return uploaded invoice pdf name', async () => {
    const expectedReturn = 'INV_' + InvoiceMocks[0].invoiceNumber + '.pdf';

    const prismaZugferdInvoiceSpy = jest.spyOn(prisma.invoice, 'findUniqueOrThrow');
    prismaZugferdInvoiceSpy.mockResolvedValue(InvoiceForZugferdMock);

    const prismaUpdateInvoiceSpy = jest.spyOn(prisma.invoice, 'update');
    prismaUpdateInvoiceSpy.mockResolvedValue(InvoiceForZugferdMock);

    const retVal = await controller.createAndUploadZugferdPDF(new CompanyIdAndInvoiceId(CompaniesSeed[0].id, InvoiceMocks[0].id));

    expect(prisma.invoice.findUniqueOrThrow).toHaveBeenCalled();
    expect(prisma.invoice.update).toHaveBeenCalled();
    expect(minioClientMock.putObject).toHaveBeenCalled();

    expect(expectedReturn).toEqual(retVal);
  });
});
