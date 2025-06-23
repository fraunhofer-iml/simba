/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import {
  DataIntegrityService,
  TokenMintService,
  TokenReadDto,
  TokenReadService,
  TokenUpdateService,
} from 'nft-folder-blockchain-connector-besu';
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProcess } from '@prisma/client';
import { AdditionalDataDto } from './additional.data.dto';
import { BlockchainConnectorService } from './blockchain-connector.service';
import { TokenReadDtoMock } from '@ap3/api';

describe('BlockchainConnectorService', () => {
  let service: BlockchainConnectorService;
  let mockedDataIntegrityService: Partial<DataIntegrityService>;
  let mockedTokenMintService: Partial<TokenMintService>;
  let mockedTokenUpdateService: Partial<TokenUpdateService>;
  let mockedTokenReadService: Partial<TokenReadService>;

  const serviceProcess: ServiceProcess = {
    id: 'testServiceProcessId',
    dueCalendarWeek: 0,
    dueYear: 0,
    scheduledDate: new Date(0),
    orderId: 'orderId',
    acceptedOfferId: 'offerId',
  };

  const testHashValue = 'test hash';

  beforeEach(async () => {
    mockedDataIntegrityService = {
      hashData() {
        return testHashValue;
      },
    };

    mockedTokenMintService = {
      mintToken() {
        return Promise.resolve(TokenReadDtoMock);
      },
    };

    mockedTokenUpdateService = {
      updateToken() {
        return Promise.resolve(TokenReadDtoMock);
      },
    };

    mockedTokenReadService = {
      getToken() {
        return Promise.resolve(TokenReadDtoMock);
      },
      getTokens() {
        return Promise.resolve([TokenReadDtoMock]);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DataIntegrityService, useValue: mockedDataIntegrityService },
        { provide: TokenMintService, useValue: mockedTokenMintService },
        { provide: TokenUpdateService, useValue: mockedTokenUpdateService },
        { provide: TokenReadService, useValue: mockedTokenReadService },
        BlockchainConnectorService,
      ],
    }).compile();

    service = module.get<BlockchainConnectorService>(BlockchainConnectorService);
  });

  it('should create new nft', async () => {
    expect(await service.mintNFT(serviceProcess, 'test invoice number', 'test', 'test uri', 'test', 'test uri')).toEqual(TokenReadDtoMock);
  });

  it('should get the payment status of a nft', async () => {
    expect(service.getPaymentState(TokenReadDtoMock)).toEqual(PaymentStates.OPEN);
  });

  it('should update nft status', async () => {
    const updatedAdditionalData: AdditionalDataDto = JSON.parse(TokenReadDtoMock.additionalData);
    updatedAdditionalData.status = PaymentStates.PAID;

    const updatedReadDto: TokenReadDto = TokenReadDtoMock;
    updatedReadDto.additionalData = JSON.stringify(updatedAdditionalData);

    expect(await service.updateNFTStatus(0, PaymentStates.PAID)).toEqual(updatedReadDto);
  });

  it('should read nft with token id', async () => {
    expect(await service.readNFT(0)).toEqual(TokenReadDtoMock);
  });

  it('should read nft with remote id', async () => {
    expect(await service.readNFTForInvoiceNumber(serviceProcess.id)).toEqual(TokenReadDtoMock);
  });
});
