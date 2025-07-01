/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationModule } from '@ap3/config';
import { DatabaseModule, NftSeed, PrismaService, ServiceProcessesSeed } from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { NftDatabaseService } from '../nft/nft-database.service';
import { TokenReadDtoMock } from '@ap3/api';
import { PaymentStates } from '@ap3/util';

describe('NftDatabaseService', () => {
  let service: NftDatabaseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigurationModule],
      providers: [
        NftDatabaseService,
        {
          provide: PrismaService,
          useValue: {
            nft: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<NftDatabaseService>(NftDatabaseService) as NftDatabaseService;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('mintNFT: should create a new nft', async () => {

    const prismaNftSpy = jest.spyOn(prisma.nft, 'create');
    prismaNftSpy.mockResolvedValue(NftSeed[0]);

    const retVal = await service.mintNFT(
      ServiceProcessesSeed[0],
      'remoteId',
      'test pdf',
      'test url',
      'test metadata',
      'test metadata url');
    expect(TokenReadDtoMock).toEqual(retVal);
  });

  it('readNFT: should read nft', async () => {
    const prismaNftSpy = jest.spyOn(prisma.nft, 'findUnique');
    prismaNftSpy.mockResolvedValue(NftSeed[0]);

    const retVal = await service.readNFT(0);
    expect(TokenReadDtoMock).toEqual(retVal);
  });

  it('readNFTForInvoiceNumber: should read nft for invoice number', async () => {
    const prismaNftSpy = jest.spyOn(prisma.nft, 'findMany');
    prismaNftSpy.mockResolvedValue(NftSeed);

    const retVal = await service.readNFTForInvoiceNumber('invoiceNumber');
    expect(TokenReadDtoMock).toEqual(retVal);
  });

  it('getPaymentState: should return the payment state of an nft', async () => {
    const retVal = service.getPaymentState(TokenReadDtoMock);
    expect(JSON.parse(TokenReadDtoMock.additionalData).status).toEqual(retVal);
  });

  it('updateNFTStatus: should update nft status', async () => {
    const prismaNftReadSpy = jest.spyOn(prisma.nft, 'findUnique');
    prismaNftReadSpy.mockResolvedValue(NftSeed[0]);

    const prismaNftUpdateSpy = jest.spyOn(prisma.nft, 'update');
    prismaNftUpdateSpy.mockResolvedValue(NftSeed[0]);

    const retVal = await service.updateNFTStatus(0, PaymentStates.PAID);
    expect(TokenReadDtoMock).toEqual(retVal);
  });

  it('readAllNfts: should return all Nfts', async () => {
    const prismaNftSpy = jest.spyOn(prisma.nft, 'findMany');
    prismaNftSpy.mockResolvedValue([NftSeed[0]]);

    const retVal = await service.readAllNfts();
    expect([TokenReadDtoMock]).toEqual(retVal);
  });
});
