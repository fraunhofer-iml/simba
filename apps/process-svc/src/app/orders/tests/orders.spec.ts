/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AllOrdersFilterAmqpDto, createOrderAmqpDtoMock, orderAmqpMock } from '@ap3/amqp';
import { scheduleOrderResponseMock } from '@ap3/cpps-scheduler-connector';
import {
  companiesSeed,
  createOrderQueryMock,
  DatabaseModule,
  findAllOrdersQueryMock,
  findSingleOrderMock,
  offersSeed,
  orderOverviewPrismaMock,
  ordersSeed,
  PrismaService,
  serviceProcessesSeed,
} from '@ap3/database';
import { ServiceStatesEnum } from '@ap3/util';
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProcess } from '@prisma/client';
import { ServiceProcessModule } from '../../service-process/service-process.module';
import { OrderManagementModule } from '../../shared/order-management/order-management.module';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';

describe('OrdersService', () => {
  let controller: OrdersController;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ServiceProcessModule, OrderManagementModule],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              findMany: jest.fn(),
              create: jest.fn(),
            },
            offer: {
              create: jest.fn(),
            },
            serviceProcess: {
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<OrdersController>(OrdersController) as OrdersController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
    global.fetch = jest.fn();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order, send it to the scheduler and create offers in status open', async () => {
    const expectedReturn = orderAmqpMock[0];
    const prismaCreateOrderSpy = jest.spyOn(prisma.order, 'create'); //mock create new order
    prismaCreateOrderSpy.mockResolvedValue(ordersSeed[0]);
    const prismaUpdateServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'update'); // mock update service state to "Open"
    prismaUpdateServiceProcessSpy.mockResolvedValue(serviceProcessesSeed[0]);
    //Mock sending order to cpps scheduler
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(scheduleOrderResponseMock),
    } as unknown as Response;
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const prismaFindManySpy = jest.spyOn(prisma.order, 'findMany'); //mock get created order for response
    prismaFindManySpy.mockResolvedValue([orderOverviewPrismaMock[0]]);
    const prismaCreateOfferSpy = jest.spyOn(prisma.offer, 'create'); //mock get created order for response
    prismaCreateOfferSpy.mockResolvedValueOnce(offersSeed[0]);
    prismaCreateOfferSpy.mockResolvedValueOnce(offersSeed[1]);
    prismaCreateOfferSpy.mockResolvedValueOnce(offersSeed[2]);
    prismaCreateOfferSpy.mockResolvedValueOnce(offersSeed[3]);

    const retVal = await controller.create(createOrderAmqpDtoMock);

    expect(prisma.order.create).toHaveBeenCalledWith({ data: createOrderQueryMock });
    expect(prisma.order.findMany).toHaveBeenCalledWith(findSingleOrderMock);
    expect(retVal).toEqual(expectedReturn);
  });

  it('should find all Orders with their specific ServiceStatus', async () => {
    const expectedReturnValue = [orderAmqpMock[1]];
    const prismaFindManySpy = jest.spyOn(prisma.order, 'findMany');

    prismaFindManySpy.mockResolvedValue(orderOverviewPrismaMock);
    const filter = new AllOrdersFilterAmqpDto();
    filter.companyId = companiesSeed[0].id;

    const res = await controller.findAll(filter);

    expect(prisma.order.findMany).toHaveBeenCalledWith(findAllOrdersQueryMock);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find one Order by Id', async () => {
    const expectedReturnValue = orderAmqpMock[0];
    const prismaFindManySpy = jest.spyOn(prisma.order, 'findMany');

    prismaFindManySpy.mockResolvedValue([orderOverviewPrismaMock[0]]);

    const res = await controller.findOne(orderOverviewPrismaMock[0].id);

    expect(prisma.order.findMany).toHaveBeenCalledWith(findSingleOrderMock);
    expect(expectedReturnValue).toEqual(res);
  });

  it('should set the order status to finished', async () => {
    const serviceProcessMock: ServiceProcess = {
      id: '0',
      orderId: orderAmqpMock[0].id,
      dueCalendarWeek: orderAmqpMock[0].requestedCalendarWeek,
      dueYear: orderAmqpMock[0].requestedYear,
      scheduledDate: new Date(),
      acceptedOfferId: '0',
    };

    const prismaInputMock = {
      where: { orderId: String(orderAmqpMock[0].id) },
      include: { order: true },
      data: {
        states: {
          create: {
            status: ServiceStatesEnum.PRODUCED,
            timestamp: new Date(),
          },
        },
      },
    };

    const prismaUpdateOrderSpy = jest.spyOn(prisma.serviceProcess, 'update');
    prismaUpdateOrderSpy.mockResolvedValue(serviceProcessMock);

    const res = await controller.finishOrder(orderOverviewPrismaMock[0].id);

    expect(prisma.serviceProcess.update).toHaveBeenCalledWith(prismaInputMock);
    expect(true).toEqual(res);
  });
});
