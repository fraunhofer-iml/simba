/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyAndInvoiceAmqpDto } from '@ap3/amqp';
import { invoiceDtoMocks } from '@ap3/api';
import { ConfigurationModule } from '@ap3/config';
import { companiesSeed, DatabaseModule, invoiceForZugferdMock, PrismaService } from '@ap3/database';
import { S3Module, S3Service } from '@ap3/s3';
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
            invoice: {
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
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
  });

  it('createAndUploadZugferdPDF: should return uploaded invoice pdf name', async () => {
    const expectedReturn = invoiceDtoMocks[0].invoiceNumber + '.pdf';

    const prismaZugferdInvoiceSpy = jest.spyOn(prisma.invoice, 'findUniqueOrThrow');
    prismaZugferdInvoiceSpy.mockResolvedValue(invoiceForZugferdMock);

    const prismaUpdateInvoiceSpy = jest.spyOn(prisma.invoice, 'update');
    prismaUpdateInvoiceSpy.mockResolvedValue(invoiceForZugferdMock);

    const retVal = await controller.createAndUploadZugferdPDF(new CompanyAndInvoiceAmqpDto(companiesSeed[0].id, invoiceDtoMocks[0].id));

    expect(prisma.invoice.findUniqueOrThrow).toHaveBeenCalled();
    expect(prisma.invoice.update).toHaveBeenCalled();
    expect(minioClientMock.putObject).toHaveBeenCalled();

    expect(expectedReturn).toEqual(retVal);
  });
});
