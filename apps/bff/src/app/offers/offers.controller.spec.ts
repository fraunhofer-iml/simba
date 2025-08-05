/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmqpBrokerQueues, OfferAmqpMock, OfferMessagePatterns, OrderAmqpMock } from '@ap3/amqp';
import { OfferDto, offerDtosMock, OrderDtosMock } from '@ap3/api';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

describe('OffersController', () => {
  let controller: OffersController;
  let clientProxy: ClientProxy;
  let offersService: OffersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OffersController],
      providers: [
        OffersService,
        {
          provide: AmqpBrokerQueues.PROCESS_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OffersController>(OffersController);
    clientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
    offersService = module.get<OffersService>(OffersService);
  });

  it('should find all Offers', async () => {
    const expectedReturnValue: OfferDto[] = offerDtosMock;
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(OfferAmqpMock);
    });

    const res: OfferDto[] = await controller.findAll();

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all Offers by their OrderId', async () => {
    const expectedReturnValue: OfferDto[] = offerDtosMock;
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(OfferAmqpMock);
    });

    const res: OfferDto[] = await controller.findAll(OrderDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_BY_ORDER_ID, OrderDtosMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });
  it('should find a single offer by Id', async () => {
    const expectedReturnValue: OfferDto = offerDtosMock[0];
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(OfferAmqpMock[0]);
    });

    const res: OfferDto = await controller.findOne(offerDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_BY_ID, offerDtosMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should accept an Offer by its Id', async () => {
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.acceptOffer(offerDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.ACCEPT_BY_ID, offerDtosMock[0].id);
  });

  it('should Decline all unaccepted Offers by their orderId', async () => {
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.declineOffers(OrderDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.DECLINE_ALL_OF_ORDER, OrderDtosMock[0].id);
  });

  it('should find a single offer by Id that has an accepted offer and return it ', async () => {
    const expectedReturnValue: OfferDto = offerDtosMock[4];
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(OfferAmqpMock[4]);
    });

    const res: OfferDto = await offersService.loadAcceptedOfferRef(OrderAmqpMock[1]);

    expect(res.id).toEqual(expectedReturnValue.id);
    expect(res.orderId).toEqual(expectedReturnValue.orderId);
  });
});
