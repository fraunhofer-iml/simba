/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AllInvoicesFilterAmqpDto,
  AmqpBrokerQueues,
  CompanyAmqpMock,
  CompanyAndInvoiceAmqpDto,
  CompanyMessagePatterns,
  InvoiceAndPaymentStatusDtoAmqpMock,
  InvoiceMessagePatterns,
  InvoicesAmqpMock,
  NotPaidStatisticsAmqpMock,
  PaidStatisticsAmqpMock,
  TRParamsCompanyIdAndYearAndFinancialRole,
} from '@ap3/amqp';
import {
  InvoiceAndPaymentStatusDtoMock,
  InvoiceDto,
  InvoiceMocks,
  PaidTrStatisticsMock,
  UnpaidStatisticsDto,
  UnpaidTradeReceivableStatisticsMock,
} from '@ap3/api';
import { CompaniesSeed } from '@ap3/database';
import { FinancialRoles, PaymentStates } from '@ap3/util';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesModule } from '../companies/companies.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let masterDataSvcClientProxy: ClientProxy;
  let processSvcClientProxy: ClientProxy;
  let request: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CompaniesModule],
      controllers: [InvoicesController],
      providers: [
        InvoicesService,
        {
          provide: AmqpBrokerQueues.PROCESS_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
        {
          provide: AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController) as InvoicesController;
    masterDataSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) as ClientProxy;
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;

    request = {
      user: {
        company: CompaniesSeed[1].id,
        realm_access: {
          roles: ['ap3_customer'],
        },
      },
    };
    const sendMasterDataRequestSpy = jest.spyOn(masterDataSvcClientProxy, 'send');
    sendMasterDataRequestSpy.mockImplementation((messagePattern: CompanyMessagePatterns, data: any) => {
      return data === 'pt0001' ? of(CompanyAmqpMock[0]) : of(CompanyAmqpMock[1]);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all invoices', async () => {
    const expectedReturnValue = InvoiceMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(InvoicesAmqpMock);
    });

    const res: InvoiceDto[] = await controller.findAll(
      request,
      InvoicesAmqpMock[0].invoiceDueDate,
      InvoicesAmqpMock[0].invoiceDueDate,
      request.user.company,
      request.user.company,
      [PaymentStates.OPEN],
      InvoicesAmqpMock[0].invoiceNumber
    );
    const params = new AllInvoicesFilterAmqpDto(
      [PaymentStates.OPEN],
      request.user.company,
      request.user.company,
      InvoicesAmqpMock[0].invoiceNumber,
      InvoicesAmqpMock[0].invoiceDueDate,
      InvoicesAmqpMock[0].invoiceDueDate
    );
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.READ_ALL, params);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find an invoice by its id', async () => {
    const expectedReturnValue = InvoiceMocks[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(InvoicesAmqpMock[0]);
    });

    const res: InvoiceDto = await controller.findOne(request, InvoiceMocks[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.READ_BY_ID,
      new CompanyAndInvoiceAmqpDto(CompaniesSeed[1].id, InvoiceMocks[0].id)
    );
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get trigger creation of a new ZUGFeRD pdf', async () => {
    const expectedReturnValue = 'INV_' + InvoiceMocks[0].invoiceNumber + '.pdf';
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(expectedReturnValue);
    });

    const res = await controller.createAndUploadZugferdPDF(request, InvoiceMocks[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.CREATE_AND_UPLOAD_ZUGFERD_PDF,
      new CompanyAndInvoiceAmqpDto(CompaniesSeed[1].id, InvoiceMocks[0].id)
    );
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable unpaid TR statistics by its companyId', async () => {
    const expectedReturnValue = UnpaidTradeReceivableStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(NotPaidStatisticsAmqpMock);
    });

    const res: UnpaidStatisticsDto = await controller.getStatisticUnpaid(request, FinancialRoles.DEBTOR);
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.READ_STATISTICS_NOT_PAID, {
      companyId: CompaniesSeed[1].id,
      financialRole: FinancialRoles.DEBTOR,
    });
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable paid TR statistics by its companyId', async () => {
    const expectedReturnValue = PaidTrStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(PaidStatisticsAmqpMock);
    });

    const res = await controller.getStatisticPaidTradePerMonth(request, 2024, FinancialRoles.DEBTOR);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.READ_STATISTICS_PAID,
      new TRParamsCompanyIdAndYearAndFinancialRole(CompaniesSeed[1].id, 2024, FinancialRoles.DEBTOR)
    );
    expect(res).toEqual(expectedReturnValue);
  });

  it('should update the Paymentstatus of an existing Invoice by its Id', async () => {
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.createPaymentStatusForInvoice(InvoiceAndPaymentStatusDtoMock);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.CREATE_NEW_PAYMENT_STATUS_FOR_INVOICE,
      InvoiceAndPaymentStatusDtoAmqpMock
    );
  });
});
