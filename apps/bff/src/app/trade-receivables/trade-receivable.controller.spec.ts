/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AmqpBrokerQueues,
  createTradeReceivableAMQPMock,
  invoiceAndPaymentStatusDtoAmqpMock,
  InvoiceIdAndPaymentStateAmqpDto,
  tradeReceivableAMQPMock,
  TradeReceivableMessagePatterns,
} from '@ap3/amqp';
import { CreateNftDto, createTradeReceivableDtoMock, tokenReadDtoMock, tradeReceivableMock } from '@ap3/api';
import { NftErrorMessagesEnum, PaymentStates } from '@ap3/util';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

describe('TradeReceivableController', () => {
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
    const expectedReturnValue = tradeReceivableMock[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(tradeReceivableAMQPMock[0]);
    });

    const res = await controller.create(createTradeReceivableDtoMock);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.CREATE, createTradeReceivableAMQPMock);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should create a nft', async () => {
    const expectedReturnValue = tokenReadDtoMock;
    const createNftSpy = jest.spyOn(processSvcClientProxy, 'send');
    createNftSpy.mockImplementation(() => {
      return of(tokenReadDtoMock);
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

    const res = await controller.updateNftPaymentStatus(invoiceAndPaymentStatusDtoAmqpMock);
    expect(updateNftSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.UPDATE_NFT, invoiceAndPaymentStatusDtoAmqpMock);
    expect(res).toBeTruthy();
  });

  it('should read all nfts', async () => {
    const expectedReturnValue = [tokenReadDtoMock];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of([tokenReadDtoMock]);
    });

    const res: TokenReadDto[] = await controller.readAllNfts();
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, []);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should read a single nft', async () => {
    const inputTradeReceivableId = 'testId';
    const expectedReturnValue = tokenReadDtoMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(tokenReadDtoMock);
    });

    const res: TokenReadDto = await controller.readNftByInvoiceNumber(inputTradeReceivableId);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ID, inputTradeReceivableId);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should not create nft due to an error', async () => {
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce(() => {
      return of(null);
    });
    try {
      await controller.createNft(new CreateNftDto('testInvoiceId'));
    } catch (error) {
      expect(error).toEqual(new NotFoundException(NftErrorMessagesEnum.NotCreated));
    }
  });

  it('should not update nft due to a missing nft', async () => {
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce(() => {
      return of(null);
    });
    try {
      await controller.updateNftPaymentStatus([new InvoiceIdAndPaymentStateAmqpDto('testInvoiceId', PaymentStates.PAID)]);
    } catch (error) {
      expect(error).toEqual(new NotFoundException(NftErrorMessagesEnum.NotFound));
    }
  });

  it('should not get nft by invoice number due to a missing nft', async () => {
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce(() => {
      return of(null);
    });
    try {
      await controller.readNftByInvoiceNumber('wrongInvoiceNumber');
    } catch (error) {
      expect(error).toEqual(new NotFoundException(NftErrorMessagesEnum.NotFound));
    }
  });
});
