/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllInvoicesFilterAmqpDto, CompanyAndInvoiceAmqpDto, InvoiceAndPaymentStatusDtoAmqpMock, InvoicesAmqpMock } from '@ap3/amqp';
import { CreateInvoiceDto, OrderOverviewMock } from '@ap3/api';
import { ConfigurationModule, ConfigurationService } from '@ap3/config';
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
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from '../invoices.controller';
import { InvoicesService } from '../invoices.service';
import { InvoicesStatisticsService } from '../statistics/invoices-statistics.service';
import { InvoicesZugferdService } from '../zugferd/invoices-zugferd.service';
import { offerMock } from './mock/offer.mock';
import { orderMock } from './mock/order.mock';

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
          provide: ConfigurationService,
          useValue: {
            getMinioConfig: jest.fn(() => {
              return {
                objectStorageURL: '',
              };
            }),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            paymentStatus: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
            order: {
              findMany: jest.fn(),
            },
            offer: {
              findMany: jest.fn(),
            },
            invoice: {
              findMany: jest.fn(),
              create: jest.fn(),
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

    jest.useFakeTimers().setSystemTime(new Date('2024-10-12T00:00:00.000Z'));
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

  it('create: should create a new invoice', async () => {
    const expectedReturn = InvoicesAmqpMock[2];

    const prismaOrderSpy = jest.spyOn(prisma.order, 'findMany');
    prismaOrderSpy.mockResolvedValueOnce([orderMock]);

    const prismaOfferSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaOfferSpy.mockResolvedValueOnce(offerMock);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'create');
    prismaInvoiceSpy.mockResolvedValueOnce(InvoiceSeed[2]);

    const retVal = await controller.create(new CreateInvoiceDto(OrderOverviewMock[0].id));
    expect(prisma.offer.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.order.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.invoice.create).toHaveBeenCalledTimes(1);
    expect(retVal).toEqual(expectedReturn);
  });

  it('create: should not create a new invoice', async () => {
    const prismaOfferSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaOfferSpy.mockResolvedValueOnce([offerMock[1]]);

    await expect(controller.create(new CreateInvoiceDto(OrderOverviewMock[0].id))).rejects.toThrow(
      new NotFoundException(OrderOverviewMock[0].id)
    );
  });

  it('findAll: should return all invoices', async () => {
    const expectedReturn = [InvoicesAmqpMock[0], InvoicesAmqpMock[1]];
    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue([TradeReceivablesSeed[0], TradeReceivablesSeed[1]]);

    const params = new AllInvoicesFilterAmqpDto(
      [PaymentStates.PAID],
      InvoiceSeed[0].creditorId,
      InvoiceSeed[0].debtorId,
      InvoicesAmqpMock[0].invoiceNumber,
      InvoicesAmqpMock[0].invoiceDueDate,
      InvoicesAmqpMock[0].invoiceDueDate
    );
    const retVal = await controller.findAll(params);
    expect(prisma.invoice.findMany).toHaveBeenCalled();
    expect(retVal).toEqual(expectedReturn);
  });

  it('findOneById: should return invoices by id', async () => {
    const expectedReturn = InvoicesAmqpMock[0];
    prismaIVManySpy.mockResolvedValue([InvoiceNFTPrismaMock[0]]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([PaymentStatesSeed[0], PaymentStatesSeed[1]]);

    const retVal = await controller.findOneById(new CompanyAndInvoiceAmqpDto(InvoiceSeed[0].debtorId, expectedReturn.id));
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(InvoiceIdQueryMock);
    expect(retVal).toEqual(expectedReturn);
  });

  it('should update the Paymentstatus of an existing Invoice by its Id ', async () => {
    const expectedReturn = true;

    const retVal = await controller.createPaymentStateForInvoice(InvoiceAndPaymentStatusDtoAmqpMock);

    expect(prisma.paymentStatus.create).toHaveBeenNthCalledWith(1, { data: CreatePaymentStatusQueryMocks[0] });
    expect(prisma.paymentStatus.create).toHaveBeenNthCalledWith(2, { data: CreatePaymentStatusQueryMocks[1] });
    expect(retVal).toEqual(expectedReturn);
  });
});
