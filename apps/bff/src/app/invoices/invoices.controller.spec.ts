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
  companyAmqpMock,
  CompanyAndInvoiceAmqpDto,
  CompanyMessagePatterns,
  invoiceAndPaymentStatusDtoAmqpMock,
  InvoiceMessagePatterns,
  invoicesAmqpMock,
  notPaidStatisticsAmqpMock,
  orderAmqpMock,
  paidStatisticsAmqpMock,
  TRParamsCompanyIdAndYearAndFinancialRole,
} from '@ap3/amqp';
import {
  CreateInvoiceDto,
  invoiceAndPaymentStatusDtoMock,
  InvoiceDto,
  invoiceDtoMocks,
  KeycloakUser,
  paidTrStatisticsMock,
  UnpaidStatisticsDto,
  unpaidTradeReceivableStatisticsMock,
} from '@ap3/api';
import { companiesSeed } from '@ap3/database';
import { FinancialRoles, PaymentStates } from '@ap3/util';
import { of, throwError } from 'rxjs';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesModule } from '../companies/companies.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let masterDataSvcClientProxy: ClientProxy;
  let processSvcClientProxy: ClientProxy;
  let request: KeycloakUser;

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
      sub: '',
      company: companiesSeed[1].id,
      realm_access: {
        roles: ['ap3_customer'],
      },
    };
    const sendMasterDataRequestSpy = jest.spyOn(masterDataSvcClientProxy, 'send');
    sendMasterDataRequestSpy.mockImplementation((messagePattern: CompanyMessagePatterns, data: any) => {
      return data === 'pt0001' ? of(companyAmqpMock[0]) : of(companyAmqpMock[1]);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new invoice', async () => {
    const newInvoiceInput: CreateInvoiceDto = new CreateInvoiceDto('testOrderId');
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(invoicesAmqpMock[0]);
    });

    const res = await controller.create(newInvoiceInput);
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.CREATE, newInvoiceInput);
    expect(res).toEqual(invoicesAmqpMock[0]);
  });

  it('should find all invoices', async () => {
    const expectedReturnValue = invoiceDtoMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(invoicesAmqpMock);
    });
    const res: InvoiceDto[] = await controller.findAll(
      request,
      invoicesAmqpMock[0].invoiceDueDate,
      invoicesAmqpMock[0].invoiceDueDate,
      invoicesAmqpMock[0].invoiceNumber,
      orderAmqpMock[0].number,
      request.company,
      request.company,
      [PaymentStates.OPEN]
    );
    const params = new AllInvoicesFilterAmqpDto(
      [PaymentStates.OPEN],
      request.company,
      request.company,
      invoicesAmqpMock[0].invoiceNumber,
      invoicesAmqpMock[0].invoiceDueDate,
      invoicesAmqpMock[0].invoiceDueDate,
      [orderAmqpMock[0].number]
    );
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.READ_ALL, params);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should set creditorId if user Role is Contributor', async () => {
    const expectedReturnValue = invoiceDtoMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(invoicesAmqpMock);
    });
    request.realm_access.roles = ['ap3_contributor'];
    const res: InvoiceDto[] = await controller.findAll(
      request,
      invoicesAmqpMock[0].invoiceDueDate,
      invoicesAmqpMock[0].invoiceDueDate,
      invoicesAmqpMock[0].invoiceNumber,
      orderAmqpMock[0].number,
      undefined,
      undefined,
      [PaymentStates.OPEN]
    );
    const params = new AllInvoicesFilterAmqpDto(
      [PaymentStates.OPEN],
      request.company,
      request.company,
      invoicesAmqpMock[0].invoiceNumber,
      invoicesAmqpMock[0].invoiceDueDate,
      invoicesAmqpMock[0].invoiceDueDate,
      [orderAmqpMock[0].number]
    );
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.READ_ALL, params);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find an invoice by its id', async () => {
    const expectedReturnValue = invoiceDtoMocks[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(invoicesAmqpMock[0]);
    });

    const res: InvoiceDto = await controller.findOne(request, invoiceDtoMocks[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.READ_BY_ID,
      new CompanyAndInvoiceAmqpDto(companiesSeed[1].id, invoiceDtoMocks[0].id)
    );
    expect(res).toEqual(expectedReturnValue);
  });

  it('should warn if call returns an error', async () => {
    const expectedError = new HttpException('Test', HttpStatus.FORBIDDEN);
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockReturnValue(throwError(() => expectedError));
    try {
      const res: InvoiceDto = await controller.findOne(request, invoiceDtoMocks[0].id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.status).toEqual(HttpStatus.FORBIDDEN);
    }
  });

  it('should get trigger creation of a new ZUGFeRD pdf', async () => {
    const expectedReturnValue = 'INV_' + invoiceDtoMocks[0].invoiceNumber + '.pdf';
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(expectedReturnValue);
    });

    const res = await controller.createAndUploadZugferdPDF(request, invoiceDtoMocks[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.CREATE_AND_UPLOAD_ZUGFERD_PDF,
      new CompanyAndInvoiceAmqpDto(companiesSeed[1].id, invoiceDtoMocks[0].id)
    );
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable unpaid TR statistics by its companyId without filter', async () => {
    const expectedReturnValue = unpaidTradeReceivableStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(notPaidStatisticsAmqpMock);
    });

    const res: UnpaidStatisticsDto = await controller.getStatisticUnpaid(request, FinancialRoles.DEBTOR);
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.READ_STATISTICS_NOT_PAID, {
      companyId: companiesSeed[1].id,
      financialRole: FinancialRoles.DEBTOR,
      invoiceIds: [],
    });
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable unpaid TR statistics by its companyId with filter', async () => {
    const expectedReturnValue = unpaidTradeReceivableStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(notPaidStatisticsAmqpMock);
    });

    const res: UnpaidStatisticsDto = await controller.getStatisticUnpaid(request, FinancialRoles.DEBTOR, '["IV0001"]');
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.READ_STATISTICS_NOT_PAID, {
      companyId: companiesSeed[1].id,
      financialRole: FinancialRoles.DEBTOR,
      invoiceIds: ['IV0001'],
    });
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable paid TR statistics by its companyId', async () => {
    const expectedReturnValue = paidTrStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(paidStatisticsAmqpMock);
    });

    const res = await controller.getStatisticPaidTradePerMonth(request, 2024, FinancialRoles.DEBTOR, '[]');
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.READ_STATISTICS_PAID,
      new TRParamsCompanyIdAndYearAndFinancialRole([], companiesSeed[1].id, 2024, FinancialRoles.DEBTOR)
    );
    expect(res).toEqual(expectedReturnValue);
  });

  it('should update the Paymentstatus of an existing Invoice by its Id', async () => {
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.createPaymentStatusForInvoice(invoiceAndPaymentStatusDtoMock);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.CREATE_NEW_PAYMENT_STATUS_FOR_INVOICE,
      invoiceAndPaymentStatusDtoAmqpMock
    );
  });

  it('should throw an error if the creation of a paymentstatus failed', async () => {
    const conflictException = new ConflictException('Creation failed');
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      throw conflictException;
    });
    try {
      await controller.createPaymentStatusForInvoice(invoiceAndPaymentStatusDtoMock);
    } catch (error) {
      expect(error).toBe(conflictException);
    }
  });
});
