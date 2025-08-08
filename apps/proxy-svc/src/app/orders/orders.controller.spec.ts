/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AmqpBrokerQueues,
  CompanyAndInvoiceAmqpDto,
  CreateTradeReceivableAmqpDto,
  InvoiceMessagePatterns,
  invoicesAmqpMock,
  tradeReceivableAMQPMock,
  TradeReceivableMessagePatterns,
} from '@ap3/amqp';
import { CreateInvoiceDto, CreateNftDto, tokenReadDtoMock, TradeReceivableDto, tradeReceivableMock } from '@ap3/api';
import { companiesSeed } from '@ap3/database';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let processSvcClientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: AmqpBrokerQueues.PROCESS_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController) as OrdersController;
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
  });

  it('should create a new Invoice, NFT and Trade Receivable', async () => {
    const request = {
      user: {
        company: companiesSeed[1].id,
        realm_access: {
          roles: ['ap3_customer'],
        },
      },
    };
    const newInvoiceInputValue: CreateInvoiceDto = new CreateInvoiceDto('testOrderId');
    const newNftInputValue: CreateNftDto = new CreateNftDto('IV001');
    const newTrInputValue: CreateTradeReceivableAmqpDto = new CreateTradeReceivableAmqpDto(
      new Date(tokenReadDtoMock.createdOn),
      tokenReadDtoMock.tokenId.toString(),
      newNftInputValue.invoiceId
    );

    const expectedZugferdReturnValue = 'INV_' + invoicesAmqpMock[0].invoiceNumber + '.pdf';
    const expectedTradeReceivableReturnValue = tradeReceivableMock[0];

    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce(() => {
      return of(invoicesAmqpMock[0]);
    });
    sendRequestSpy.mockImplementationOnce(() => {
      return of(true);
    });
    sendRequestSpy.mockImplementationOnce(() => {
      return of(expectedZugferdReturnValue);
    });
    sendRequestSpy.mockImplementationOnce(() => {
      return of(tokenReadDtoMock);
    });
    sendRequestSpy.mockImplementationOnce(() => {
      return of(tradeReceivableAMQPMock[0]);
    });

    const res: TradeReceivableDto = await controller.finish(request, 'testOrderId');

    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.CREATE, newInvoiceInputValue);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.CREATE_AND_UPLOAD_ZUGFERD_PDF,
      new CompanyAndInvoiceAmqpDto(companiesSeed[1].id, invoicesAmqpMock[0].id)
    );
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.CREATE_NFT, newNftInputValue);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.CREATE, newTrInputValue);
    expect(res).toEqual(expectedTradeReceivableReturnValue);
  });
});
