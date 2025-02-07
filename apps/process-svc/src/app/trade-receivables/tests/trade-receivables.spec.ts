import { CreateTradeReceivableAMQPMock, TradeReceivableAMQPMock } from '@ap3/amqp';
import { TokenReadDtoMock } from '@ap3/api';
import { BlockchainConnectorService } from '@ap3/blockchain-connector';
import { ConfigurationModule } from '@ap3/config';
import {
  createTradeReceivableQuery,
  DatabaseModule,
  InvoiceSeed,
  PaymentStatesSeed,
  PrismaService,
  ServiceProcessesSeed,
  TradeReceivablesSeed,
} from '@ap3/database';
import { S3Module, S3Service } from '@ap3/s3';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesStatisticsService } from '../../invoices/statistics/invoices-statistics.service';
import { MetadataService } from '../metadata/metadata.service';
import { TradeReceivablesController } from '../trade-receivables.controller';
import { TradeReceivablesService } from '../trade-receivables.service';

describe('TradeReceivablesController', () => {
  let controller: TradeReceivablesController;
  let prisma: PrismaService;
  let blockchainConnectorService: BlockchainConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, S3Module, ConfigurationModule],
      controllers: [TradeReceivablesController],
      providers: [
        TradeReceivablesService,
        InvoicesStatisticsService,
        {
          provide: MetadataService,
          useValue: {
            createMetadata: jest.fn(),
            uploadMetadata: jest.fn(),
            generateFileUrl: jest.fn(),
          },
        },
        {
          provide: BlockchainConnectorService,
          useValue: {
            mintNFT: jest.fn(),
            readNFTs: jest.fn(),
            readNFT: jest.fn(),
          },
        },
        {
          provide: S3Service,
          useValue: {
            fetchFile: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            tradeReceivable: {
              create: jest.fn(),
            },
            paymentStatus: {
              findMany: jest.fn(),
            },
            invoice: {
              findMany: [],
            },
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<TradeReceivablesController>(TradeReceivablesController) as TradeReceivablesController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
    blockchainConnectorService = module.get<BlockchainConnectorService>(BlockchainConnectorService) as BlockchainConnectorService;
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

  it('createNft: should create new nft for an invoice', async () => {
    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findMany');
    prismaInvoiceSpy.mockResolvedValue([InvoiceSeed[0]]);

    const serviceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');
    serviceProcessSpy.mockResolvedValue(ServiceProcessesSeed[0]);

    const blockchainConnectorSpy = jest.spyOn(blockchainConnectorService, 'mintNFT');
    blockchainConnectorSpy.mockResolvedValue(TokenReadDtoMock);

    const testInput = 'testInvoiceId';
    const expectedReturn = TokenReadDtoMock;
    const retVal = await controller.createNft(testInput);

    expect(prisma.invoice.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.serviceProcess.findUnique).toHaveBeenCalledTimes(1);
    expect(expectedReturn).toEqual(retVal);
  });

  it('readAllNfts: should read every nft that is stored', async () => {
    const blockchainConnectorSpy = jest.spyOn(blockchainConnectorService, 'readNFTs');
    blockchainConnectorSpy.mockResolvedValue([TokenReadDtoMock]);

    const expectedReturn = [TokenReadDtoMock];
    const retVal = await controller.readAllNfts();
    expect(expectedReturn).toEqual(retVal);
  });

  it('readNftByID: should return the nft with the given tradeReceivableId', async () => {
    const prismaTradeReceivableSpy = jest.spyOn(prisma.tradeReceivable, 'findUnique');
    prismaTradeReceivableSpy.mockResolvedValue(TradeReceivablesSeed[0]);

    const blockchainConnectorSpy = jest.spyOn(blockchainConnectorService, 'readNFT');
    blockchainConnectorSpy.mockResolvedValue(TokenReadDtoMock);

    const expectedReturn = TokenReadDtoMock;
    const retVal = await controller.readNftByTradeReceivableId(TradeReceivablesSeed[0].id);
    expect(expectedReturn).toEqual(retVal);
  });
});
