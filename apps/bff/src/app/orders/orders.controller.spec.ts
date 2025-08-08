/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import {
  AllOrdersFilterAmqpDto,
  AmqpBrokerQueues,
  createOrderAmqpDtoWithoutPrismaConverterMock,
  getMachineAssignmentAMQPMock,
  offerAmqpMock,
  OfferMessagePatterns,
  orderAmqpMock,
  OrderMessagePatterns,
  ServiceProcessPattern,
  serviceProcessStatesAmqpMock,
} from '@ap3/amqp';
import {
  companyDtoMock,
  createOrderMock,
  invoiceDtoMocks,
  KeycloakUser,
  offerDtosMock,
  OrderDetailsDto,
  orderDetailsMock,
  OrderOverviewDto,
  orderOverviewMock,
  productDtoMocks,
} from '@ap3/api';
import { ConfigurationModule, ConfigurationService } from '@ap3/config';
import { companiesSeed } from '@ap3/database';
import { of, throwError } from 'rxjs';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from '../companies/companies.service';
import { InvoicesService } from '../invoices/invoices.service';
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
  let invoicesService: InvoicesService;
  let request: KeycloakUser;

  let sendProcessRequestSpy;
  let companiesServiceSpy;
  let offersServiceLoadSpy;
  let productServiceLoadSpy;
  let invoicesServiceSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigurationModule],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        ServiceProcessService,
        CompaniesService,
        ProductsService,
        OffersService,
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
    invoicesService = module.get<InvoicesService>(InvoicesService) as InvoicesService;

    sendProcessRequestSpy = jest.spyOn(processSvcClientProxy, 'send');

    companiesServiceSpy = jest.spyOn(companiesService, 'findOne');
    companiesServiceSpy.mockResolvedValue(companyDtoMock[0]);
    offersServiceLoadSpy = jest.spyOn(offersService, 'loadAcceptedOfferRef');
    offersServiceLoadSpy.mockResolvedValue(offerDtosMock[0]);
    productServiceLoadSpy = jest.spyOn(productsService, 'loadProductRefs');
    productServiceLoadSpy.mockResolvedValue(productDtoMocks[0]);
    invoicesServiceSpy = jest.spyOn(invoicesService, 'findAllWithFilter');
    invoicesServiceSpy.mockResolvedValue(invoiceDtoMocks);

    request = {
      sub: '',
      company: companiesSeed[0].id,
      realm_access: {
        roles: ['ap3_customer'],
      },
    };
  });

  it('should create an Order', async () => {
    const expectedReturnValue = orderOverviewMock[0];

    sendProcessRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(orderAmqpMock[0]);
    });

    const res: OrderOverviewDto = await controller.create(request, createOrderMock[0]);

    expect(sendProcessRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.CREATE, createOrderAmqpDtoWithoutPrismaConverterMock);
    expect(offersServiceLoadSpy).toHaveBeenCalledWith(orderAmqpMock[0]);
    expect(productServiceLoadSpy).toHaveBeenCalledWith(orderAmqpMock[0]);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should findAll Orders', async () => {
    const expectedReturnValue: any = orderOverviewMock;

    companiesServiceSpy.mockResolvedValueOnce(companyDtoMock[0]);
    companiesServiceSpy.mockResolvedValueOnce(companyDtoMock[1]);

    offersServiceLoadSpy.mockResolvedValueOnce(offerDtosMock[0]);
    offersServiceLoadSpy.mockResolvedValueOnce(offerDtosMock[1]);

    productServiceLoadSpy.mockResolvedValueOnce(productDtoMocks[0]);
    productServiceLoadSpy.mockResolvedValueOnce(productDtoMocks[0]);

    invoicesServiceSpy.mockResolvedValue(invoiceDtoMocks);

    sendProcessRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(orderAmqpMock);
    });

    const res: OrderOverviewDto[] = await controller.findAll(request, companiesSeed[0].id);

    expect(sendProcessRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_ALL, {
      companyId: companiesSeed[0].id,
      customerName: undefined,
      productionDateFrom: undefined,
      productionDateTo: undefined,
      serviceStates: [],
    } satisfies AllOrdersFilterAmqpDto);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should throw an error if Amqp call returns an error', async () => {
    const expectedError = new HttpException('Test', HttpStatus.FORBIDDEN);

    const loggerSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    sendProcessRequestSpy.mockReturnValue(throwError(() => expectedError));
    try {
      const res: OrderOverviewDto[] = await controller.findAll(request, companiesSeed[0].id);
    } catch (error) {
      expect(loggerSpy).toHaveBeenCalledWith(util.inspect(expectedError));
    }
  });

  it('should find an Order by Id', async () => {
    const expectedReturnValue = orderOverviewMock[0];

    sendProcessRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(orderAmqpMock[0]);
    });

    const res: OrderOverviewDto = await controller.findOne(orderOverviewMock[0].id);

    expect(sendProcessRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_BY_ID, orderOverviewMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find order details by Id without an offer', async () => {
    const expectedReturnValue = orderDetailsMock[0];

    sendProcessRequestSpy.mockImplementationOnce((messagePattern: OrderMessagePatterns.READ_BY_ID, data: any) => {
      return of(orderAmqpMock[0]);
    });
    sendProcessRequestSpy.mockImplementationOnce((messagePattern: ServiceProcessPattern.GET_MACHINE_ASSIGNMENT, data: any) => {
      return of([getMachineAssignmentAMQPMock[0], getMachineAssignmentAMQPMock[1]]);
    });
    sendProcessRequestSpy.mockImplementationOnce((messagePattern: ServiceProcessPattern.GET_SERVICE_STATES, data: any) => {
      return of([serviceProcessStatesAmqpMock[0], serviceProcessStatesAmqpMock[1]]);
    });
    sendProcessRequestSpy.mockImplementationOnce((messagePattern: OrderMessagePatterns.READ_BY_ID, data: any) => {
      return of(orderAmqpMock[0]);
    });

    const res: OrderDetailsDto = await controller.findOneDetails(orderOverviewMock[0].id);

    expect(sendProcessRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_BY_ID, orderOverviewMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find order details by Id with an offer', async () => {
    const expectedReturnValue = orderDetailsMock[1];

    offersServiceLoadSpy.mockResolvedValue(offerDtosMock[1]);
    sendProcessRequestSpy.mockImplementationOnce((messagePattern: OrderMessagePatterns.READ_BY_ID, data: any) => {
      return of(orderAmqpMock[1]);
    });
    sendProcessRequestSpy.mockImplementationOnce((messagePattern: ServiceProcessPattern.GET_MACHINE_ASSIGNMENT, data: any) => {
      return of([getMachineAssignmentAMQPMock[2]]);
    });
    sendProcessRequestSpy.mockImplementationOnce((messagePattern: ServiceProcessPattern.GET_SERVICE_STATES, data: any) => {
      return of([serviceProcessStatesAmqpMock[2]]);
    });
    sendProcessRequestSpy.mockImplementationOnce((messagePattern: OrderMessagePatterns.READ_BY_ID, data: any) => {
      return of(orderAmqpMock[1]);
    });
    sendProcessRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns.READ_BY_ID, data: any) => {
      return of(offerAmqpMock[1]);
    });

    const res: OrderDetailsDto = await controller.findOneDetails(orderOverviewMock[1].id);
    expect(sendProcessRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_BY_ID, orderOverviewMock[1].id);
    expect(res.machineAssignments).toEqual(expectedReturnValue.machineAssignments);
    expect(res.order).toEqual(expectedReturnValue.order);
    expect(res.processStateHistory).toEqual(expectedReturnValue.processStateHistory);
    expect(res.offer.id).toEqual(expectedReturnValue.offer.id);
    expect(res.offer.orderId).toEqual(expectedReturnValue.offer.orderId);
  });

  it('should delete an Order', async () => {
    sendProcessRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.deleteOne(orderOverviewMock[0].id);

    expect(sendProcessRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.REMOVE_ORDER_BY_ID, orderOverviewMock[0].id);
  });

  it('should throw an error if companyId isnt requesting users CompanyId', async () => {
    try {
      const res: OrderOverviewDto = await controller.create(request, createOrderMock[1]);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('should throw an error if Order creation failed', async () => {
    const expectedError = new HttpException('Test', HttpStatus.BAD_REQUEST);
    const loggerSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    sendProcessRequestSpy.mockReturnValue(throwError(() => expectedError));
    try {
      const res: OrderOverviewDto = await controller.create(request, createOrderMock[0]);
    } catch (error) {
      expect(loggerSpy).toHaveBeenCalledWith(util.inspect(expectedError));
    }
  });

  it('should throw an error if an order couldnt be found', async () => {
    const expectedError = new HttpException('Test', HttpStatus.NOT_FOUND);
    const loggerSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    sendProcessRequestSpy.mockReturnValue(throwError(() => expectedError));
    try {
      const res: OrderOverviewDto = await controller.findOne(orderAmqpMock[0].id);
    } catch (error) {
      expect(loggerSpy).toHaveBeenCalledWith(util.inspect(expectedError));
    }
  });
});
