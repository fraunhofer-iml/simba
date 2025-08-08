/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmqpBrokerQueues, ProductMessagePatterns } from '@ap3/amqp';
import { ProductDto, productDtoMocks } from '@ap3/api';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('OrdersController', () => {
  let controller: ProductsController;
  let masterDataSvcClientProxy: ClientProxy;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController) as ProductsController;
    masterDataSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) as ClientProxy;
    productsService = module.get<ProductsService>(ProductsService) as ProductsService;
  });

  it('should find all Products', async () => {
    const expectedReturnValue: ProductDto[] = productDtoMocks;
    const sendRequestSpy = jest.spyOn(masterDataSvcClientProxy, 'send');

    sendRequestSpy.mockImplementation((messagePattern: ProductMessagePatterns, data: any) => {
      return of(productDtoMocks);
    });

    const res: ProductDto[] = await controller.findAll();

    expect(sendRequestSpy).toHaveBeenCalledWith(ProductMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find an Product by its Id', async () => {
    const expectedReturnValue: ProductDto = productDtoMocks[0];
    const sendRequestSpy = jest.spyOn(masterDataSvcClientProxy, 'send');

    sendRequestSpy.mockImplementation((messagePattern: ProductMessagePatterns, data: any) => {
      return of(productDtoMocks[0]);
    });

    const res: ProductDto = await controller.findOne(productDtoMocks[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(ProductMessagePatterns.READ_BY_ID, productDtoMocks[0].id);
    expect(res).toEqual(expectedReturnValue);
  });
});
