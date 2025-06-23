/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrokerAmqp } from '@ap3/amqp';
import { ConfigurationService } from '@ap3/config';
import { OrdersSeed } from '@ap3/database';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthGuard, RoleGuard } from 'nest-keycloak-connect';
import { HttpService } from '@nestjs/axios';
import { CanActivate, HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { OffersService } from '../../../bff/src/offers/offers.service';

describe('OffersController', () => {
  let app: INestApplication;
  let httpService: HttpService;
  let mockAdapter: MockAdapter;
  let config: ConfigurationService;
  const access_token = '1-gr4nt-4cc355-t0-4nyth1ng';

  beforeAll(async () => {
    const mockAlwaysSuccess: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [BrokerAmqp],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAlwaysSuccess)
      .overrideGuard(RoleGuard)
      .useValue(mockAlwaysSuccess)
      .compile();

    httpService = moduleRef.get<OffersService>(OffersService)['httpService'];
    mockAdapter = new MockAdapter(httpService.axiosRef);
    config = moduleRef.get<ConfigurationService>(ConfigurationService) as ConfigurationService;

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    mockAdapter
      .onPost(`${config.getKeycloakConfig().url}/realms/${config.getKeycloakConfig().realm}/protocol/openid-connect/token`)
      .reply(HttpStatus.CREATED, {
        access_token: access_token,
      });

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should return all offers if requested by an Authorized User', async () => {
    const res = await axios.get(`/offers`, {
      params: {
        orderId: OrdersSeed[0].id,
      },
    });

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });

  it('should return a message', async () => {
    const res = await axios.get(`/offers`, {
      params: {
        orderId: OrdersSeed[0].id,
      },
    });

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});
