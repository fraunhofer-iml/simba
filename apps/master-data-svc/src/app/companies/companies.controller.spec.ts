/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyAmqpDto, CompanyAmqpMock } from '@ap3/amqp';
import {
  CompaniesSeed,
  CompanyWithPaymentModalitiesTypes,
  DatabaseModule,
  GET_COMPANY_BY_ID_QUERY_MOCK,
  PaymentInformationSeed,
  PrismaService,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

describe('CompanyController', () => {
  let controller: CompaniesController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: PrismaService,
          useValue: {
            company: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<CompaniesController>(CompaniesController) as CompaniesController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll: should return all companies', async () => {
    const expectedReturn: CompanyAmqpDto[] = CompanyAmqpMock;
    const mockResolve: any = <CompanyWithPaymentModalitiesTypes[]>[
      { ...CompaniesSeed[0], paymentInformation: [PaymentInformationSeed[0]] },
      { ...CompaniesSeed[1], paymentInformation: [PaymentInformationSeed[1]] },
      { ...CompaniesSeed[2], paymentInformation: [PaymentInformationSeed[2]] },
    ];

    const prismaSpy = jest.spyOn(prisma.company, 'findMany');
    prismaSpy.mockResolvedValue(mockResolve);

    const retVal = await controller.findAll();
    expect(prisma.company.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOne: should return company by id', async () => {
    const expectedReturn = CompanyAmqpMock[0];
    const mockResolve: any = <CompanyWithPaymentModalitiesTypes>{ ...CompaniesSeed[0], paymentInformation: [PaymentInformationSeed[0]] };

    const prismaSpy = jest.spyOn(prisma.company, 'findUnique');
    prismaSpy.mockResolvedValue(mockResolve);

    const retVal = await controller.findOne(CompaniesSeed[0].id);
    expect(prisma.company.findUnique).toHaveBeenCalledWith(GET_COMPANY_BY_ID_QUERY_MOCK);
    expect(retVal).toEqual(expectedReturn);
  });

  it('findOne: should throw if not present in database', async () => {
    const prismaSpy = jest.spyOn(prisma.company, 'findUnique');
    prismaSpy.mockResolvedValue(null);

    await expect(async () => {
      await controller.findOne(CompaniesSeed[0].id);
    }).rejects.toThrow();
    expect(prisma.company.findUnique).toHaveBeenCalledWith(GET_COMPANY_BY_ID_QUERY_MOCK);
  });
});
