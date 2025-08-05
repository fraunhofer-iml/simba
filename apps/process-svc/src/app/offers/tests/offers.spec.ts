/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferAmqpMock } from '@ap3/amqp';
import { AcceptScheduledOfferResponseMock } from '@ap3/cpps-scheduler-connector';
import {
  DatabaseModule,
  OffersSeed,
  OrderOverviewPrismaMock,
  PrismaService,
  queryOffersToShowWithOrder,
  queryOpenOffersByOrderId,
  queryUniqueOrThrow,
  ServiceProcessesSeed,
  setAcceptedForServiceQuery,
  setOfferStateToAcceptedQuery,
  setOfferStateToDeclinedQuery,
  setServiceStateToAcceptedQuery,
  setServiceStateToCanceledQuery,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderManagementModule } from '../../shared/order-management/order-management.module';
import { OffersController } from '../offers.controller';
import { OffersService } from '../offers.service';

describe('OfferController', () => {
  let controller: OffersController;
  let prisma: PrismaService;
  let prismaFindOffersSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, OrderManagementModule],
      controllers: [OffersController],
      providers: [
        OffersService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              update: jest.fn(),
              findMany: jest.fn(),
            },
            offer: {
              findUniqueOrThrow: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            serviceProcess: {
              update: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<OffersController>(OffersController) as OffersController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
    global.fetch = jest.fn();

    prismaFindOffersSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaFindOffersSpy.mockResolvedValue([OffersSeed[0], OffersSeed[1], OffersSeed[2], OffersSeed[3]]);
  });

  it('findAll: should return all offers', async () => {
    const expectedReturn = [OfferAmqpMock[0]];
    const prismaSpy = jest.spyOn(prisma.offer, 'findMany');
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findMany');

    prismaServiceProcessSpy.mockResolvedValueOnce([ServiceProcessesSeed[0]]);
    prismaSpy.mockResolvedValue([OffersSeed[0]]);

    const retVal = await controller.findAll();
    expect(prisma.offer.findMany).toHaveBeenCalled();
    expect(retVal).toEqual(expectedReturn);
  });

  it('findAllByOrderId: should return offers by order id', async () => {
    const expectedReturn = [OfferAmqpMock[0], OfferAmqpMock[1], OfferAmqpMock[2], OfferAmqpMock[3]];
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');
    prismaServiceProcessSpy.mockResolvedValueOnce(ServiceProcessesSeed[0]);
    prismaServiceProcessSpy.mockResolvedValueOnce(ServiceProcessesSeed[1]);
    prismaServiceProcessSpy.mockResolvedValueOnce(ServiceProcessesSeed[2]);
    prismaServiceProcessSpy.mockResolvedValueOnce(ServiceProcessesSeed[3]);

    const retVal = await controller.findAllByOrderId(expectedReturn[0].orderId);
    expect(prisma.offer.findMany).toHaveBeenCalledWith(queryOffersToShowWithOrder);
    expect(retVal).toEqual(expectedReturn);
  });

  it('findOne: should return a specific', async () => {
    const expectedReturn = OfferAmqpMock[0];
    const prismaSpy = jest.spyOn(prisma.offer, 'findUniqueOrThrow');
    prismaSpy.mockResolvedValue(OffersSeed[0]);

    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');
    prismaServiceProcessSpy.mockResolvedValue(ServiceProcessesSeed[0]);

    const retVal = await controller.findOne(expectedReturn.id);
    expect(prisma.offer.findUniqueOrThrow).toHaveBeenCalled();
    expect(prisma.offer.findUniqueOrThrow).toHaveBeenCalledWith(queryUniqueOrThrow);
    expect(expectedReturn).toEqual(retVal);
  });

  it('acceptOffer: should accept one offer and decline all other offers of an order', async () => {
    const expectedReturn = OfferAmqpMock[0];
    const prismaOfferUpdateSpy = jest.spyOn(prisma.offer, 'update'); //mock accept and decline / refuse offers
    prismaOfferUpdateSpy.mockResolvedValue(OffersSeed[0]);
    const prismaServiceProcessUpdateSpy = jest.spyOn(prisma.serviceProcess, 'update'); //mock set accepted offer in service process and update service state to planned
    prismaServiceProcessUpdateSpy.mockResolvedValue(ServiceProcessesSeed[0]);
    prismaFindOffersSpy.mockResolvedValue(OffersSeed.slice(1, 4)); //mock find remaining open offers to decline them
    const prismaOrderFindManySpy = jest.spyOn(prisma.order, 'findMany'); //mock get order to get product id and quantity
    prismaOrderFindManySpy.mockResolvedValue([OrderOverviewPrismaMock[0]]);

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(AcceptScheduledOfferResponseMock),
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const retVal = await controller.acceptOffer(OffersSeed[0].id);

    expect(prismaOfferUpdateSpy).toHaveBeenCalledWith(setOfferStateToAcceptedQuery); //expect accept offers query
    expect(prismaOfferUpdateSpy).toHaveBeenLastCalledWith(setOfferStateToDeclinedQuery); //expect decline offers query
    expect(prismaServiceProcessUpdateSpy).toHaveBeenCalledWith(setAcceptedForServiceQuery); //set accepted offer in service process
    expect(prismaServiceProcessUpdateSpy).toHaveBeenCalledWith(setServiceStateToAcceptedQuery); //set service state to planned
    expect(prismaFindOffersSpy).toHaveBeenCalledWith(queryOpenOffersByOrderId); //get not accepted orders to decline them
    expect(prismaOfferUpdateSpy).toHaveBeenCalledTimes(4);
    expect(retVal).toEqual(expectedReturn);
  });

  it('declineAllOffers: should decline all offers for an order', async () => {
    const expectedReturn = true;
    const prismaOfferUpdateSpy = jest.spyOn(prisma.offer, 'update'); //mock decline / refuse offers
    prismaOfferUpdateSpy.mockResolvedValue(OffersSeed[0]);
    const prismaServiceProcessUpdateSpy = jest.spyOn(prisma.serviceProcess, 'update'); //mock update service state to canceled
    prismaServiceProcessUpdateSpy.mockResolvedValue(ServiceProcessesSeed[0]);

    const retVal = await controller.declineOffersByOrderId(ServiceProcessesSeed[0].orderId);

    expect(prismaOfferUpdateSpy).toHaveBeenLastCalledWith(setOfferStateToDeclinedQuery); //expect decline offers query
    expect(prismaServiceProcessUpdateSpy).toHaveBeenCalledWith(setServiceStateToCanceledQuery); //set service state to canceled
    expect(expectedReturn).toEqual(retVal);
  });
});
