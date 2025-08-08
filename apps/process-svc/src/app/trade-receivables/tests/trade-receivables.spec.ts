/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createTradeReceivableAMQPMock,
  invoiceAndPaymentStatusDtoAmqpMock,
  TradeReceivableAmqpDto,
  tradeReceivableAMQPMock,
} from '@ap3/amqp';
import { CreateNftDto, tokenReadDtoMock, tokenUpdateDtoMock } from '@ap3/api';
import { BlockchainConnectorService } from '@ap3/blockchain-connector';
import { ConfigurationModule } from '@ap3/config';
import {
  createTradeReceivableQuery,
  DatabaseModule,
  invoiceSeed,
  paymentStatesSeed,
  PrismaService,
  serviceProcessesSeed,
  tradeReceivablesSeed,
} from '@ap3/database';
import { S3Module, S3Service } from '@ap3/s3';
import { MINIO_CONNECTION } from 'nestjs-minio';
import {
  DataIntegrityService,
  TokenMintService,
  TokenReadDto,
  TokenReadService,
  TokenUpdateService,
} from 'nft-folder-blockchain-connector-besu';
import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesStatisticsService } from '../../invoices/statistics/invoices-statistics.service';
import { MetadataService } from '../metadata/metadata.service';
import { NftBlockchainService } from '../nft/nft-blockchain.service';
import { NftDatabaseService } from '../nft/nft-database.service';
import { TradeReceivablesController } from '../trade-receivables.controller';
import { TradeReceivablesService } from '../trade-receivables.service';
import { ReadableMock } from './mocks/minio-object.mock';

describe('TradeReceivables', () => {
  let controller: TradeReceivablesController;
  let prisma: PrismaService;
  let tokenMintService: TokenMintService;
  let tokenUpdateService: TokenUpdateService;
  let tokenReadService: TokenReadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, S3Module, ConfigurationModule, ScheduleModule.forRoot()],
      controllers: [TradeReceivablesController],
      providers: [
        TradeReceivablesService,
        InvoicesStatisticsService,
        MetadataService,
        BlockchainConnectorService,
        NftDatabaseService,
        NftBlockchainService,
        {
          provide: 'NftService',
          useClass: NftBlockchainService,
        },
        S3Service,
        {
          provide: PrismaService,
          useValue: {
            tradeReceivable: {
              create: jest.fn(),
            },
            paymentStatus: {
              findMany: jest.fn(),
              updateMany: jest.fn(),
            },
            invoice: {
              findMany: jest.fn(),
            },
            offer: {
              findMany: jest.fn(),
            },
            machineAssignment: {
              findMany: jest.fn(),
            },
            serviceStatus: {
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: MINIO_CONNECTION,
          useValue: {
            getObject: jest.fn(() => ReadableMock),
            putObject: jest.fn(),
          },
        },
        {
          provide: DataIntegrityService,
          useValue: {
            hashData: jest.fn(),
          },
        },
        {
          provide: TokenMintService,
          useValue: {
            mintToken: jest.fn(),
          },
        },
        {
          provide: TokenUpdateService,
          useValue: {
            updateToken: jest.fn(),
          },
        },
        {
          provide: TokenReadService,
          useValue: {
            getToken: jest.fn(),
            getTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<TradeReceivablesController>(TradeReceivablesController) as TradeReceivablesController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
    tokenMintService = module.get<TokenMintService>(TokenMintService) as TokenMintService;
    tokenUpdateService = module.get<TokenUpdateService>(TokenUpdateService) as TokenUpdateService;
    tokenReadService = module.get<TokenReadService>(TokenReadService) as TokenReadService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create: should create new tr for an invoice', async () => {
    const prismaTradeReceivableSpy = jest.spyOn(prisma.tradeReceivable, 'create');
    prismaTradeReceivableSpy.mockResolvedValue(tradeReceivablesSeed[0]);
    const prismaPaymentStatusSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPaymentStatusSpy.mockResolvedValue([paymentStatesSeed[0], paymentStatesSeed[1]]);

    const expectedReturn: TradeReceivableAmqpDto = tradeReceivableAMQPMock[0];
    const retVal: TradeReceivableAmqpDto = await controller.create(createTradeReceivableAMQPMock);

    expect(prisma.tradeReceivable.create).toHaveBeenCalledWith({ data: createTradeReceivableQuery });
    expect(prisma.tradeReceivable.create).toHaveBeenCalledTimes(1);
    expect(expectedReturn).toEqual(retVal);
  });

  it('createNft: should create new nft for an invoice', async () => {
    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findMany');
    prismaInvoiceSpy.mockResolvedValue([invoiceSeed[0]]);

    const serviceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');
    serviceProcessSpy.mockResolvedValue(serviceProcessesSeed[0]);

    const prismaOfferSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaOfferSpy.mockResolvedValue([]);

    const prismaMachineAssignmentSpy = jest.spyOn(prisma.machineAssignment, 'findMany');
    prismaMachineAssignmentSpy.mockResolvedValue([]);

    const prismaServiceStatusSpy = jest.spyOn(prisma.serviceStatus, 'findMany');
    prismaServiceStatusSpy.mockResolvedValue([]);

    const mintNftSpy = jest.spyOn(tokenMintService, 'mintToken');
    mintNftSpy.mockResolvedValue(tokenReadDtoMock);

    const createNftDto: CreateNftDto = {
      invoiceId: 'testInvoiceId',
    };
    const expectedReturn: TokenReadDto = tokenReadDtoMock;
    const retVal: TokenReadDto = await controller.createNft(createNftDto);

    expect(prisma.invoice.findMany).toHaveBeenCalledTimes(2);
    expect(prisma.serviceProcess.findUnique).toHaveBeenCalledTimes(2);
    expect(expectedReturn).toEqual(retVal);
  });

  it('updateNftPaymentStatus: should update a stored nft', async () => {
    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findMany');
    prismaInvoiceSpy.mockResolvedValue([invoiceSeed[0]]);

    const prismaTradeReceivableSpy = jest.spyOn(prisma.tradeReceivable, 'findUnique');
    prismaTradeReceivableSpy.mockResolvedValue(tradeReceivablesSeed[0]);

    const prismaPaymentStatusSpy = jest.spyOn(prisma.paymentStatus, 'create');
    prismaPaymentStatusSpy.mockResolvedValue(undefined);

    const readNftSpy = jest.spyOn(tokenReadService, 'getTokens');
    readNftSpy.mockResolvedValue([tokenReadDtoMock]);

    const readNftByTokenIdSpy = jest.spyOn(tokenReadService, 'getToken');
    readNftByTokenIdSpy.mockResolvedValue(tokenReadDtoMock);

    const updateNftSpy = jest.spyOn(tokenUpdateService, 'updateToken');
    updateNftSpy.mockResolvedValue(tokenUpdateDtoMock);

    const retVal: boolean = await controller.updateNftPaymentStatus(invoiceAndPaymentStatusDtoAmqpMock);
    expect(retVal).toBeTruthy();
  });

  it('readAllNfts: should read every nft that is stored', async () => {
    const readNftSpy = jest.spyOn(tokenReadService, 'getTokens');
    readNftSpy.mockResolvedValue([tokenReadDtoMock]);

    const expectedReturn: TokenReadDto[] = [tokenReadDtoMock];
    const retVal: TokenReadDto[] = await controller.readAllNfts();
    expect(expectedReturn).toEqual(retVal);
  });

  it('readNftByInvoiceNumber: should return the nft with the given invoice number', async () => {
    const testInvoiceNumber = 'testInvoiceNumber';

    const readNftSpy = jest.spyOn(tokenReadService, 'getTokens');
    readNftSpy.mockResolvedValue([tokenReadDtoMock]);

    const expectedReturn: TokenReadDto = tokenReadDtoMock;
    const retVal: TokenReadDto = await controller.readNftByInvoiceNumber(testInvoiceNumber);
    expect(expectedReturn).toEqual(retVal);
  });
});
