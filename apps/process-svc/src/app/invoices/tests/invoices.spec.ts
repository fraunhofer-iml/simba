import { AllInvoicesFilterAmqpDto, CompanyAndInvoiceAmqpDto, InvoiceAndPaymentStatusDtoAmqpMock, InvoicesAmqpMock } from '@ap3/amqp';
import { ConfigurationModule } from '@ap3/config';
import {
  CreatePaymentStatusQueryMocks,
  DatabaseModule,
  InvoiceIdQueryMock,
  InvoiceNFTPrismaMock,
  InvoiceSeed,
  PaymentStatesSeed,
  PaymentStatusMocks,
  PrismaService,
  TradeReceivableMocks,
  TradeReceivablesSeed,
} from '@ap3/database';
import { S3Module, S3Service } from '@ap3/s3';
import { PaymentStates } from '@ap3/util';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from '../invoices.controller';
import { InvoicesService } from '../invoices.service';
import { InvoicesStatisticsService } from '../statistics/invoices-statistics.service';
import { InvoicesZugferdService } from '../zugferd/invoices-zugferd.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let prisma: PrismaService;
  let minioClientMock: Partial<Client>;
  let prismaIVManySpy;
  let prismaPSCreateSpy;
  let prismaPSSpy;
  let prismaTRFindSpy;

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
        InvoicesStatisticsService,
        {
          provide: PrismaService,
          useValue: {
            paymentStatus: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
            invoice: {
              findMany: jest.fn(),
            },
            tradeReceivable: {
              findUnique: jest.fn(),
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

    jest.useFakeTimers().setSystemTime(new Date('2024-10-11T07:55:55.695Z'));
    controller = module.get<InvoicesController>(InvoicesController) as InvoicesController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;

    prismaIVManySpy = jest.spyOn(prisma.invoice, 'findMany');
    prismaIVManySpy.mockResolvedValue(InvoiceNFTPrismaMock);

    prismaPSCreateSpy = jest.spyOn(prisma.paymentStatus, 'create');
    prismaPSCreateSpy.mockResolvedValueOnce(PaymentStatusMocks[0]);
    prismaPSCreateSpy.mockResolvedValueOnce(PaymentStatusMocks[1]);

    prismaTRFindSpy = jest.spyOn(prisma.tradeReceivable, 'findUnique');
    prismaTRFindSpy.mockResolvedValueOnce(TradeReceivableMocks[0]);
    prismaTRFindSpy.mockResolvedValueOnce(TradeReceivableMocks[0]);

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

    const params = new AllInvoicesFilterAmqpDto(InvoiceSeed[0].creditorId, InvoiceSeed[0].debtorId, PaymentStates.PAID);
    const retVal = await controller.findAll(params);
    expect(prisma.invoice.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOneById: should return invoices by id', async () => {
    const expectedReturn = InvoicesAmqpMock[0];
    prismaIVManySpy.mockResolvedValue([InvoiceNFTPrismaMock[0]]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);

    const retVal = await controller.findOneById(new CompanyAndInvoiceAmqpDto(InvoiceSeed[0].debtorId, expectedReturn.id));
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(InvoiceIdQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('should update the Paymentstatus of an existing Invoice by its Id ', async () => {
    const expectedReturn = true;

    const retVal = await controller.createPaymentStateForInvoice(InvoiceAndPaymentStatusDtoAmqpMock);

    expect(prisma.paymentStatus.create).toHaveBeenNthCalledWith(1, { data: CreatePaymentStatusQueryMocks[0] });
    expect(prisma.paymentStatus.create).toHaveBeenNthCalledWith(2, { data: CreatePaymentStatusQueryMocks[1] });
    expect(expectedReturn).toEqual(retVal);
  });
});
