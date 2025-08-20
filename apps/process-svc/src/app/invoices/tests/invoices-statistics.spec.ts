/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  invoicePaymentStatusCountMock,
  notPaidStatisticsAmqpMock,
  paidStatisticsAmqpMock,
  TRParamsCompanyIdAndYearAndFinancialRole,
} from '@ap3/amqp';
import { BlockchainConnectorService } from '@ap3/blockchain-connector';
import { ConfigurationModule } from '@ap3/config';
import {
  aggregationSumNovember,
  aggregationSumSeptember,
  companiesSeed,
  DatabaseModule,
  dueInvoiceCount,
  paidInvoiceIdsNovember,
  paidInvoiceIdsSeptember,
  paidOnTimeInvoiceCount,
  PrismaService,
} from '@ap3/database';
import { S3Module } from '@ap3/s3';
import { FinancialRoles } from '@ap3/util';
import { DataIntegrityService, TokenMintService, TokenReadService, TokenUpdateService } from 'nft-folder-blockchain-connector-besu';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentManagementService } from '../../invoices/payment-management/payment-management.service';
import { NftBlockchainFactory } from '../../nfts/util/nft-blockchain-factory';
import { NftDatabaseFactory } from '../../nfts/util/nft-database-factory';
import { InvoicesController } from '../invoices.controller';
import { InvoicesService } from '../invoices.service';
import { InvoicesStatisticsService } from '../statistics/invoices-statistics.service';
import { InvoicesZugferdService } from '../zugferd/invoices-zugferd.service';

describe('InvoicesStatisticsController', () => {
  let controller: InvoicesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, S3Module, ConfigurationModule],
      controllers: [InvoicesController],
      providers: [
        InvoicesService,
        InvoicesZugferdService,
        InvoicesStatisticsService,
        BlockchainConnectorService,
        NftDatabaseFactory,
        NftBlockchainFactory,
        PaymentManagementService,
        {
          provide: 'NftFactory',
          useClass: NftBlockchainFactory,
        },
        {
          provide: PrismaService,
          useValue: {
            invoice: {
              aggregate: jest.fn(),
            },
            $queryRaw: jest.fn(),
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
    controller = module.get<InvoicesController>(InvoicesController) as InvoicesController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('calcPaidInvoiceVolumePerMonth: should create a statistic about paid and due Invoices', async () => {
    const expectedReturn = paidStatisticsAmqpMock;

    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(paidInvoiceIdsSeptember)
      .mockResolvedValueOnce(paidInvoiceIdsNovember)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    prismaRawSpy.mockResolvedValueOnce(dueInvoiceCount);

    prismaRawSpy.mockResolvedValueOnce(paidOnTimeInvoiceCount);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'aggregate');
    prismaInvoiceSpy.mockResolvedValueOnce(aggregationSumSeptember).mockResolvedValueOnce(aggregationSumNovember);

    const retVal = await controller.calcPaidInvoiceVolumePerMonth(
      new TRParamsCompanyIdAndYearAndFinancialRole([], companiesSeed[0].id, 2024, FinancialRoles.DEBTOR)
    );
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllOverdueByCreditorId: should return outstanding Invoices', async () => {
    const expectedReturn = notPaidStatisticsAmqpMock;

    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue(invoicePaymentStatusCountMock);

    const retVal = await controller.getInvoiceNotPaidStatistics({
      invoiceIds: [],
      companyId: companiesSeed[0].id,
      financialRole: FinancialRoles.DEBTOR,
    });

    expect(prisma.$queryRaw).toHaveBeenCalled();

    expect(expectedReturn).toEqual(retVal);
  });
});
