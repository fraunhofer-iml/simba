/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllInvoicesFilterAmqpDto, CompanyAndInvoiceAmqpDto, invoiceAndPaymentStatusDtoAmqpMock, invoicesAmqpMock } from '@ap3/amqp';
import { CreateInvoiceDto, orderOverviewMock } from '@ap3/api';
import { ConfigurationModule, ConfigurationService } from '@ap3/config';
import {
  createPaymentStatusQueryMocks,
  DatabaseModule,
  invoiceIdQueryMock,
  invoiceNFTPrismaMock,
  invoiceSeed,
  paymentStatesSeed,
  paymentStatusMocks,
  PrismaService,
  tradeReceivableMocks,
  tradeReceivablesSeed,
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
    prismaIVManySpy.mockResolvedValue(invoiceNFTPrismaMock);

    prismaPSCreateSpy = jest.spyOn(prisma.paymentStatus, 'create');
    prismaPSCreateSpy.mockResolvedValueOnce(paymentStatusMocks[0]);
    prismaPSCreateSpy.mockResolvedValueOnce(paymentStatusMocks[1]);

    prismaTRFindSpy = jest.spyOn(prisma.tradeReceivable, 'findUnique');
    prismaTRFindSpy.mockResolvedValueOnce(tradeReceivableMocks[0]);
    prismaTRFindSpy.mockResolvedValueOnce(tradeReceivableMocks[0]);

    prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([paymentStatesSeed[0], paymentStatesSeed[1]]);
    prismaPSSpy.mockResolvedValueOnce([paymentStatesSeed[2], paymentStatesSeed[3]]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create: should create a new invoice', async () => {
    const expectedReturn = invoicesAmqpMock[2];

    const prismaOrderSpy = jest.spyOn(prisma.order, 'findMany');
    prismaOrderSpy.mockResolvedValueOnce([orderMock]);

    const prismaOfferSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaOfferSpy.mockResolvedValueOnce(offerMock);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'create');
    prismaInvoiceSpy.mockResolvedValueOnce(invoiceSeed[2]);

    const retVal = await controller.create(new CreateInvoiceDto(orderOverviewMock[0].id));
    expect(prisma.offer.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.order.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.invoice.create).toHaveBeenCalledTimes(1);
    expect(retVal).toEqual(expectedReturn);
  });

  it('create: should not create a new invoice', async () => {
    const prismaOfferSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaOfferSpy.mockResolvedValueOnce([offerMock[1]]);

    await expect(controller.create(new CreateInvoiceDto(orderOverviewMock[0].id))).rejects.toThrow(
      new NotFoundException(orderOverviewMock[0].id)
    );
  });

  it('findAll: should return all invoices', async () => {
    const expectedReturn = [invoicesAmqpMock[0], invoicesAmqpMock[1]];
    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue([tradeReceivablesSeed[0], tradeReceivablesSeed[1]]);

    const params = new AllInvoicesFilterAmqpDto(
      [PaymentStates.PAID],
      invoiceSeed[0].creditorId,
      invoiceSeed[0].debtorId,
      invoicesAmqpMock[0].invoiceNumber,
      invoicesAmqpMock[0].invoiceDueDate,
      invoicesAmqpMock[0].invoiceDueDate
    );
    const retVal = await controller.findAll(params);
    expect(prisma.invoice.findMany).toHaveBeenCalled();
    expect(retVal).toEqual(expectedReturn);
  });

  it('findOneById: should return invoices by id', async () => {
    const expectedReturn = invoicesAmqpMock[0];
    prismaIVManySpy.mockResolvedValue([invoiceNFTPrismaMock[0]]);

    const prismaPSSpy = jest.spyOn(prisma.paymentStatus, 'findMany');
    prismaPSSpy.mockResolvedValueOnce([paymentStatesSeed[0], paymentStatesSeed[1]]);

    const retVal = await controller.findOneById(new CompanyAndInvoiceAmqpDto(invoiceSeed[0].debtorId, expectedReturn.id));
    expect(prisma.invoice.findMany).toHaveBeenCalledWith(invoiceIdQueryMock);
    expect(retVal).toEqual(expectedReturn);
  });

  it('should update the Paymentstatus of an existing Invoice by its Id ', async () => {
    const expectedReturn = true;

    const retVal = await controller.createPaymentStateForInvoice(invoiceAndPaymentStatusDtoAmqpMock);

    expect(prisma.paymentStatus.create).toHaveBeenNthCalledWith(1, { data: createPaymentStatusQueryMocks[0] });
    expect(prisma.paymentStatus.create).toHaveBeenNthCalledWith(2, { data: createPaymentStatusQueryMocks[1] });
    expect(retVal).toEqual(expectedReturn);
  });
});
