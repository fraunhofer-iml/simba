/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { tokenReadDtoMock } from '@ap3/api';
import { ConfigurationModule } from '@ap3/config';
import { DatabaseModule, nftSeed, PrismaService, serviceProcessesSeed } from '@ap3/database';
import { PaymentStates } from '@ap3/util';
import { Test, TestingModule } from '@nestjs/testing';
import { NftDatabaseFactory } from '../nft/nft-database-factory';

describe('NftDatabaseService', () => {
  let service: NftDatabaseFactory;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigurationModule],
      providers: [
        NftDatabaseFactory,
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

    service = module.get<NftDatabaseFactory>(NftDatabaseFactory) as NftDatabaseFactory;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('mintNFT: should create a new nft', async () => {
    const prismaNftSpy = jest.spyOn(prisma.nft, 'create');
    prismaNftSpy.mockResolvedValue(nftSeed[0]);

    const retVal = await service.mintNFT(serviceProcessesSeed[0], 'remoteId', 'test pdf', 'test url', 'test metadata', 'test metadata url');
    expect(tokenReadDtoMock).toEqual(retVal);
  });

  it('readNFT: should read nft', async () => {
    const prismaNftSpy = jest.spyOn(prisma.nft, 'findUnique');
    prismaNftSpy.mockResolvedValue(nftSeed[0]);

    const retVal = await service.readNFT(0);
    expect(tokenReadDtoMock).toEqual(retVal);
  });

  it('readNFTForInvoiceNumber: should read nft for invoice number', async () => {
    const prismaNftSpy = jest.spyOn(prisma.nft, 'findMany');
    prismaNftSpy.mockResolvedValue(nftSeed);

    const retVal = await service.readNFTForInvoiceNumber('invoiceNumber');
    expect(tokenReadDtoMock).toEqual(retVal);
  });

  it('getPaymentState: should return the payment state of an nft', async () => {
    const retVal = service.getPaymentState(tokenReadDtoMock);
    expect(JSON.parse(tokenReadDtoMock.additionalData).status).toEqual(retVal);
  });

  it('updateNFTStatus: should update nft status', async () => {
    const prismaNftReadSpy = jest.spyOn(prisma.nft, 'findUnique');
    prismaNftReadSpy.mockResolvedValue(nftSeed[0]);

    const prismaNftUpdateSpy = jest.spyOn(prisma.nft, 'update');
    prismaNftUpdateSpy.mockResolvedValue(nftSeed[0]);

    const retVal = await service.updateNFTStatus(0, PaymentStates.PAID);
    expect(tokenReadDtoMock).toEqual(retVal);
  });

  it('readAllNfts: should return all Nfts', async () => {
    const prismaNftSpy = jest.spyOn(prisma.nft, 'findMany');
    prismaNftSpy.mockResolvedValue([nftSeed[0]]);

    const retVal = await service.readAllNfts();
    expect([tokenReadDtoMock]).toEqual(retVal);
  });
});
