/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AmqpBrokerQueues,
  CreateOrderAmqpDtoWithoutPrismaConverterMock,
  GetMachineAssignmentAMQPMock,
  OrderAmqpMock,
  OrderMessagePatterns,
  ServiceProcessPattern,
  ServiceProcessStatesAmqpMock,
} from '@ap3/amqp';
import {
  CompanyDtoMock,
  createOrderMock,
  OpenOffersMock,
  OrderDetailsDto,
  OrderDetailsMock,
  OrderOverviewDto,
  OrderOverviewMock,
  ProductDtoMocks,
} from '@ap3/api';
import { ConfigurationModule, ConfigurationService } from '@ap3/config';
import { CompaniesSeed } from '@ap3/database';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from '../companies/companies.service';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';
import { ServiceProcessService } from '../service-process/service-process.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let processSvcClientProxy: ClientProxy;
  let productsService: ProductsService;
  let offersService: OffersService;
  let companiesService: CompaniesService;

  let companiesServiceSpy;
  let offersServiceLoadSpy;
  let sendRequestSpy;
  let productServiceLoadSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigurationModule],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        ServiceProcessService,
        {
          provide: CompaniesService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            loadProductRefs: jest.fn(),
          },
        },
        {
          provide: OffersService,
          useValue: {
            loadOfferRef: jest.fn(),
            createOffer: jest.fn(),
          },
        },
        {
          provide: AmqpBrokerQueues.PROCESS_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
        {
          provide: ConfigurationService,
          useValue: {
            getGeneralConfig: jest.fn().mockReturnValue({
              platformOperator: 'pt0002',
              platformCurrency: 'EUR',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController) as OrdersController;
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
    productsService = module.get<ProductsService>(ProductsService) as ProductsService;
    offersService = module.get<OffersService>(OffersService) as OffersService;
    companiesService = module.get<CompaniesService>(CompaniesService) as CompaniesService;

    companiesServiceSpy = jest.spyOn(companiesService, 'findOne');
    companiesServiceSpy.mockResolvedValue(CompanyDtoMock[0]);
    offersServiceLoadSpy = jest.spyOn(offersService, 'loadOfferRef');
    offersServiceLoadSpy.mockResolvedValue(OpenOffersMock[0]);
    productServiceLoadSpy = jest.spyOn(productsService, 'loadProductRefs');
    productServiceLoadSpy.mockResolvedValue(ProductDtoMocks[0]);
    sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
  });

  it('should create an Order', async () => {
    const expectedReturnValue = OrderOverviewMock[0];

    sendRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(OrderAmqpMock[0]);
    });

    const res: OrderOverviewDto = await controller.create(createOrderMock);

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.CREATE, CreateOrderAmqpDtoWithoutPrismaConverterMock);
    expect(offersServiceLoadSpy).toHaveBeenCalledWith(OrderAmqpMock[0]);
    expect(productServiceLoadSpy).toHaveBeenCalledWith(OrderAmqpMock[0]);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should findAll Orders', async () => {
    const expectedReturnValue = OrderOverviewMock;

    companiesServiceSpy.mockResolvedValueOnce(CompanyDtoMock[0]);
    companiesServiceSpy.mockResolvedValueOnce(CompanyDtoMock[1]);

    offersServiceLoadSpy.mockResolvedValueOnce(OpenOffersMock[0]);
    offersServiceLoadSpy.mockResolvedValueOnce(OpenOffersMock[1]);

    productServiceLoadSpy.mockResolvedValueOnce(ProductDtoMocks[0]);
    productServiceLoadSpy.mockResolvedValueOnce(ProductDtoMocks[0]);

    sendRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(OrderAmqpMock);
    });

    const res: OrderOverviewDto[] = await controller.findAll(CompaniesSeed[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_ALL, CompaniesSeed[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find an Order by Id', async () => {
    const expectedReturnValue = OrderOverviewMock[0];

    sendRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(OrderAmqpMock[0]);
    });

    const res: OrderOverviewDto = await controller.findOne(OrderOverviewMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_BY_ID, OrderOverviewMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find order details by Id', async () => {
    const expectedReturnValue = OrderDetailsMock[0];

    sendRequestSpy.mockImplementationOnce((messagePattern: OrderMessagePatterns.READ_BY_ID, data: any) => {
      return of(OrderAmqpMock[0]);
    });
    sendRequestSpy.mockImplementationOnce((messagePattern: ServiceProcessPattern.GET_MACHINE_ASSIGNMENT, data: any) => {
      return of([GetMachineAssignmentAMQPMock[0], GetMachineAssignmentAMQPMock[1]]);
    });
    sendRequestSpy.mockImplementationOnce((messagePattern: ServiceProcessPattern.GET_SERVICE_STATES, data: any) => {
      return of([ServiceProcessStatesAmqpMock[0], ServiceProcessStatesAmqpMock[1]]);
    });

    const res: OrderDetailsDto = await controller.findOneDetails(OrderOverviewMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_BY_ID, OrderOverviewMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should delete an Order', async () => {
    sendRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.deleteOne(OrderOverviewMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.REMOVE_ORDER_BY_ID, OrderOverviewMock[0].id);
  });
});
