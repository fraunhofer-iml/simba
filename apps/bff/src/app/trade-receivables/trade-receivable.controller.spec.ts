/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AmqpBrokerQueues,
  CreateTradeReceivableAMQPMock,
  InvoiceAndPaymentStatusDtoAmqpMock,
  TradeReceivableAMQPMock,
  TradeReceivableMessagePatterns,
} from '@ap3/amqp';
import { CreateNftDto, createTradeReceivableDtoMock, TokenReadDtoMock, TradeReceivableMock } from '@ap3/api';
import { CompaniesSeed } from '@ap3/database';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

describe('OrdersController', () => {
  let controller: TradeReceivablesController;
  let processSvcClientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TradeReceivablesController],
      providers: [
        TradeReceivablesService,
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

    controller = module.get<TradeReceivablesController>(TradeReceivablesController) as TradeReceivablesController;
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
  });

  it('should create a Tradereceivable', async () => {
    const expectedReturnValue = TradeReceivableMock[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivableAMQPMock[0]);
    });

    const res = await controller.create(createTradeReceivableDtoMock);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.CREATE, CreateTradeReceivableAMQPMock);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should create a nft', async () => {
    const expectedReturnValue = TokenReadDtoMock;
    const createNftSpy = jest.spyOn(processSvcClientProxy, 'send');
    createNftSpy.mockImplementation(() => {
      return of(TokenReadDtoMock);
    });

    const createNftDto: CreateNftDto = {
      invoiceId: 'testInvoiceId',
    };

    const res = await controller.createNft(createNftDto);
    expect(createNftSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.CREATE_NFT, createNftDto);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should update a nft', async () => {
    const updateNftSpy = jest.spyOn(processSvcClientProxy, 'send');
    updateNftSpy.mockImplementation(() => {
      return of(true);
    });

    const res = await controller.updateNftPaymentStatus(InvoiceAndPaymentStatusDtoAmqpMock);
    expect(updateNftSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.UPDATE_NFT, InvoiceAndPaymentStatusDtoAmqpMock);
    expect(res).toBeTruthy();
  });

  it('should read all nfts', async () => {
    const expectedReturnValue = [TokenReadDtoMock];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of([TokenReadDtoMock]);
    });

    const res: TokenReadDto[] = await controller.readAllNfts();
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, []);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should read a single nft', async () => {
    const inputTradeReceivableId = 'testId';
    const expectedReturnValue = TokenReadDtoMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TokenReadDtoMock);
    });

    const res: TokenReadDto = await controller.readNftByInvoiceNumber(inputTradeReceivableId);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ID, inputTradeReceivableId);
    expect(res).toEqual(expectedReturnValue);
  });
});
