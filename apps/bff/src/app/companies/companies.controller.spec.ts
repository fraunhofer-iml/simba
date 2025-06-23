/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmqpBrokerQueues, CompanyAmqpDto, CompanyAmqpMock, CompanyMessagePatterns } from '@ap3/amqp';
import { CompanyDto, CompanyDtoMock, KeycloakUser } from '@ap3/api';
import { CompaniesSeed } from '@ap3/database';
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
      company: CompaniesSeed[1].id,
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
      await controller.create(CompanyDtoMock[0]);
    }).rejects.toThrow(NotImplementedException);
  });

  it('should find all Companys', async () => {
    const expectedResult: CompanyDto[] = CompanyDtoMock;
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: CompanyMessagePatterns, data: any) => {
      return of(CompanyAmqpMock);
    });

    const res: CompanyAmqpDto[] = await controller.findAll();

    expect(sendRequestSpy).toHaveBeenCalledWith(CompanyMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedResult);
  });

  it('should find a specific Company by its Id', async () => {
    const expectedResult: CompanyDto = CompanyDtoMock[0];
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: CompanyMessagePatterns, data: any) => {
      return of(CompanyAmqpMock[0]);
    });

    const res: CompanyAmqpDto = await controller.findOne(request, CompanyAmqpMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(CompanyMessagePatterns.READ_BY_ID, CompanyDtoMock[0].id);
    expect(res).toEqual(expectedResult);
  });
  it('should update a company', async () => {
    await expect(async () => {
      await controller.update(request, CompanyDtoMock[0].id, CompanyDtoMock[0]);
    }).rejects.toThrow(NotImplementedException);
  });
  it('should remove a company', async () => {
    await expect(async () => {
      await controller.remove(CompanyDtoMock[0].id);
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
