/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductAmqpDto, productAmqpMock } from '@ap3/amqp';
import { DatabaseModule, getProductByIdQueryMock, PrismaService, productsSeed } from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<ProductsController>(ProductsController) as ProductsController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll: should return all products', async () => {
    const expectedReturn: ProductAmqpDto[] = productAmqpMock;

    const prismaSpy = jest.spyOn(prisma.product, 'findMany');
    prismaSpy.mockResolvedValue(productsSeed);

    const retVal = await controller.findAll();
    expect(prisma.product.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOne: should return product by id', async () => {
    const expectedReturn = productAmqpMock[0];

    const prismaSpy = jest.spyOn(prisma.product, 'findUnique');
    prismaSpy.mockResolvedValue(productsSeed[0]);

    const retVal = await controller.findOne(productsSeed[0].id);
    expect(prisma.product.findUnique).toHaveBeenCalledWith(getProductByIdQueryMock);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOne: should throw if not present in database', async () => {
    const prismaSpy = jest.spyOn(prisma.product, 'findUnique');
    prismaSpy.mockResolvedValue(null);

    await expect(async () => {
      await controller.findOne(productsSeed[0].id);
    }).rejects.toThrow();
    expect(prisma.product.findUnique).toHaveBeenCalledWith(getProductByIdQueryMock);
  });
});
