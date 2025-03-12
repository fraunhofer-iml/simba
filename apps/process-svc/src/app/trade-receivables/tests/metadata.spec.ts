/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationModule } from '@ap3/config';
import {
  DatabaseModule,
  InvoiceSeed,
  MachineAssignmentSeed,
  OffersSeed,
  PrismaService,
  ServiceProcessesSeed,
  ServiceStatesSeed,
} from '@ap3/database';
import { S3Module, S3Service } from '@ap3/s3';
import { Test, TestingModule } from '@nestjs/testing';
import { MetadataService } from '../metadata/metadata.service';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { MetadataMock } from './mocks/metadata.mock';
import { ReadableMock } from './mocks/minio-object.mock';

describe('MetadataService', () => {
  let service: MetadataService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, S3Module, ConfigurationModule],
      providers: [
        MetadataService,
        S3Service,
        {
          provide: PrismaService,
          useValue: {
            serviceProcess: {
              findUnique: jest.fn(),
            },
            offer: {
              findMany: jest.fn(),
            },
            machineAssignment: {
              findMany: jest.fn(),
            },
            invoice: {
              findMany: jest.fn(),
            },
            serviceStatus: {
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: MINIO_CONNECTION,
          useValue: {
            getObject: jest.fn(() => ReadableMock),
            putObject: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MetadataService>(MetadataService) as MetadataService;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('createMetadata: should create a new metadata object', async () => {
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');
    prismaServiceProcessSpy.mockResolvedValue(ServiceProcessesSeed[0]);

    const prismaOfferSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaOfferSpy.mockResolvedValue([OffersSeed[0], OffersSeed[1]]);

    const prismaMachineAssignmentSpy = jest.spyOn(prisma.machineAssignment, 'findMany');
    prismaMachineAssignmentSpy.mockResolvedValue([MachineAssignmentSeed[0], MachineAssignmentSeed[1]]);

    const prismaInvoiceSpy = jest.spyOn(prisma.invoice, 'findMany');
    prismaInvoiceSpy.mockResolvedValue([InvoiceSeed[0], InvoiceSeed[1]]);

    const prismaServiceStatusSpy = jest.spyOn(prisma.serviceStatus, 'findMany');
    prismaServiceStatusSpy.mockResolvedValue([ServiceStatesSeed[0], ServiceStatesSeed[1]]);

    const retVal = await service.createMetadata(ServiceProcessesSeed[0].id);
    expect(MetadataMock).toEqual(retVal);
  });

  it('uploadMetadata: should upload a metadata object', async () => {
    const expectedReturn = 'METADATA_sp001.json';
    const retVal = await service.uploadMetadata(MetadataMock);
    expect(retVal).toEqual(expectedReturn);
  });
});
