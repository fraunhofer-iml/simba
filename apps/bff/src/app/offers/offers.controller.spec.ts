/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmqpBrokerQueues, newOffersRequestMock, offerAmqpMock, OfferMessagePatterns, orderAmqpMock } from '@ap3/amqp';
import {
  OfferDto,
  offerDtosMock,
  orderDtosMock,
  requestNewOffersDtoMock,
  requestNewOffersDtoMockWrongKW
} from '@ap3/api';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import {BadRequestException} from "@nestjs/common";

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
      return of(offerAmqpMock);
    });

    const res: OfferDto[] = await controller.findAll();

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all Offers by their OrderId', async () => {
    const expectedReturnValue: OfferDto[] = offerDtosMock;
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(offerAmqpMock);
    });

    const res: OfferDto[] = await controller.findAll(orderDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_BY_ORDER_ID, orderDtosMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find a single offer by Id', async () => {
    const expectedReturnValue: OfferDto = offerDtosMock[0];
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(offerAmqpMock[0]);
    });

    const res: OfferDto = await controller.findOne(offerDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_BY_ID, offerDtosMock[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_BY_ID, offerDtosMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should accept an Offer by its Id', async () => {
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.acceptOffer(offerDtosMock[0].id);
    await controller.acceptOffer(offerDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.ACCEPT_BY_ID, offerDtosMock[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.ACCEPT_BY_ID, offerDtosMock[0].id);
  });

  it('should Decline all unaccepted Offers by their orderId', async () => {
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.declineOffers(orderDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.DECLINE_ALL_OF_ORDER, orderDtosMock[0].id);
  });

  it('should find a single offer by Id that has an accepted offer and return it ', async () => {
    const expectedReturnValue: OfferDto = offerDtosMock[4];
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(offerAmqpMock[4]);
    });

    const res: OfferDto = await offersService.loadAcceptedOfferRef(orderAmqpMock[1]);

    expect(res.id).toEqual(expectedReturnValue.id);
    expect(res.orderId).toEqual(expectedReturnValue.orderId);
  });

  it('should generate new offers for a given orderId and calendarWeek ', async () => {
    const expectedReturnValue: OfferDto[] = offerDtosMock;
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(offerAmqpMock);
    });

    const res: OfferDto[] = await controller.generateNewOffers(requestNewOffersDtoMock);

    expect(res).toEqual(expectedReturnValue);
    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.CREATE, newOffersRequestMock);
  });

  it('should throw because calendarWeek is not valid', async () => {
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(offerAmqpMock);
    });

    await expect(controller.generateNewOffers(requestNewOffersDtoMockWrongKW)).rejects.toThrow(BadRequestException)
  });
});
