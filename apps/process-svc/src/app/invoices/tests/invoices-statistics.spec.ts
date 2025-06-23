/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { NotPaidStatisticsAmqpMock, PaidStatisticsAmqpMock, TRParamsCompanyIdAndYearAndFinancialRole } from '@ap3/amqp';
import { ConfigurationModule } from '@ap3/config';
import {
  AggregationSumNovember,
  AggregationSumSeptember,
  CompaniesSeed,
  DatabaseModule,
  DueInvoiceCount,
  PaidInvoiceIdsNovember,
  PaidInvoiceIdsSeptember,
  PaidOnTimeInvoiceCount,
  PrismaService,
  TradeReceivablePaymentStatusCountMock,
} from '@ap3/database';
import { S3Module } from '@ap3/s3';
import { FinancialRoles } from '@ap3/util';
import { Test, TestingModule } from '@nestjs/testing';
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
        {
          provide: PrismaService,
          useValue: {
            invoice: {
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
  });

  it('calcPaidTradeReceivableVolumePerMonth: should create a statistic about paid and due trade receivables', async () => {
    const expectedReturn = PaidStatisticsAmqpMock;

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
      .mockResolvedValueOnce(PaidInvoiceIdsSeptember)
      .mockResolvedValueOnce(PaidInvoiceIdsNovember)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    prismaRawSpy.mockResolvedValueOnce(DueInvoiceCount);

    prismaRawSpy.mockResolvedValueOnce(PaidOnTimeInvoiceCount);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'aggregate');
    prismaInvoiceSpy.mockResolvedValueOnce(AggregationSumSeptember).mockResolvedValueOnce(AggregationSumNovember);

    const retVal = await controller.calcPaidTradeReceivableVolumePerMonth(
      new TRParamsCompanyIdAndYearAndFinancialRole([], CompaniesSeed[0].id, 2024, FinancialRoles.DEBTOR)
    );
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllOverdueByCreditorId: should return outstanding trade receivables', async () => {
    const expectedReturn = NotPaidStatisticsAmqpMock;

    const prismaRawSpy = jest.spyOn(prisma, '$queryRaw');
    prismaRawSpy.mockResolvedValue(TradeReceivablePaymentStatusCountMock);

    const retVal = await controller.getTradeReceivableNotPaidStatistics({
      invoiceIds: [],
      companyId: CompaniesSeed[0].id,
      financialRole: FinancialRoles.DEBTOR,
    });

    expect(prisma.$queryRaw).toHaveBeenCalled();

    expect(expectedReturn).toEqual(retVal);
  });
});
