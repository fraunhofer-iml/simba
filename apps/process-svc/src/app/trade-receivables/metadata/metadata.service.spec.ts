import { Test, TestingModule } from '@nestjs/testing';
import { MetadataService } from './metadata.service';
import {
  DatabaseModule,
  InvoiceSeed,
  MachineAssignmentSeed,
  OffersSeed,
  PrismaService,
  ServiceProcessesSeed, ServiceStatesSeed,
} from '@ap3/database';
import { S3Module, S3Service } from '@ap3/s3';
import { ConfigurationModule, ConfigurationService, MinioConfig } from '@ap3/config';
import { MetadataDto } from './metadata.dto';


describe('MetadataService', () => {
  let service: MetadataService;
  let prisma: PrismaService;

  const testMetadata: MetadataDto = new MetadataDto(
    ServiceProcessesSeed[0],
    ['of001', 'of002'],
    [MachineAssignmentSeed[0], MachineAssignmentSeed[1]],
    ['IV001', 'IV002'],
    [ServiceStatesSeed[0], ServiceStatesSeed[1]]
  );

  const testMetadataConfig: MinioConfig = {
    bucket: 'testBucket',
    url: 'testUrl',
    port: 'testPort',
    accessKey: 'testAccessKey',
    secret: 'testSecret',
    invoicePrefix: 'testInvoicePrefix',
    metadataPrefix: 'testPrefix-',
    objectStorageURL: 'testObjectStorageURL/'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, S3Module, ConfigurationModule],
      providers: [
        MetadataService,
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
            }
          },
        },
        {
          provide: S3Service,
          useValue: {
            uploadJson: jest.fn(),
          },
        },
        {
          provide: ConfigurationService,
          useValue: {
            getMinioConfig: jest.fn(() => testMetadataConfig),
          },
        }
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
    expect(testMetadata).toEqual(retVal);
  });

  it('uploadMetadata: should upload a metadata object', async () => {
    const expectedReturn = 'testPrefix-sp001.json';
    const retVal = await service.uploadMetadata(testMetadata);
    expect(expectedReturn).toEqual(retVal);
  });
});
