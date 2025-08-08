/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmqpBrokerQueues, CompanyAmqpDto, companyAmqpMock, CompanyMessagePatterns } from '@ap3/amqp';
import { CompanyDto, companyDtoMock, KeycloakUser } from '@ap3/api';
import { companiesSeed } from '@ap3/database';
import { of } from 'rxjs';
import { ForbiddenException, NotImplementedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let clientProxy: ClientProxy;
  let request: KeycloakUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController) as CompaniesController;
    clientProxy = module.get<ClientProxy>(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) as ClientProxy;
    request = {
      sub: '',
      company: companiesSeed[1].id,
      realm_access: {
        roles: ['ap3_admin'],
      },
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a Company', async () => {
    await expect(async () => {
      await controller.create(companyDtoMock[0]);
    }).rejects.toThrow(NotImplementedException);
  });

  it('should find all Companys', async () => {
    const expectedResult: CompanyDto[] = companyDtoMock;
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: CompanyMessagePatterns, data: any) => {
      return of(companyAmqpMock);
    });

    const res: CompanyAmqpDto[] = await controller.findAll();

    expect(sendRequestSpy).toHaveBeenCalledWith(CompanyMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedResult);
  });

  it('should find a specific Company by its Id', async () => {
    const expectedResult: CompanyDto = companyDtoMock[0];
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: CompanyMessagePatterns, data: any) => {
      return of(companyAmqpMock[0]);
    });

    const res: CompanyAmqpDto = await controller.findOne(request, companyAmqpMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(CompanyMessagePatterns.READ_BY_ID, companyDtoMock[0].id);
    expect(res).toEqual(expectedResult);
  });
  it('should update a company', async () => {
    await expect(async () => {
      await controller.update(request, companyDtoMock[0].id, companyDtoMock[0]);
    }).rejects.toThrow(NotImplementedException);
  });
  it('should remove a company', async () => {
    await expect(async () => {
      await controller.remove(companyDtoMock[0].id);
    }).rejects.toThrow(NotImplementedException);
  });

  it('should throw an error if an unauthorized user tries to find one Company', async () => {
    await expect(async () => {
      request.realm_access.roles = ['ap3_customer'];
      const res = await controller.findOne(request, 'fwsfs');
      return res;
    }).rejects.toThrow(ForbiddenException);
  });

  it('should throw an error if an unauthorized user tries to update a Company', async () => {
    await expect(async () => {
      request.realm_access.roles = ['ap3_customer'];
      const res = await controller.update(request, 'fwsfs', undefined);
      return res;
    }).rejects.toThrow(ForbiddenException);
  });
});
