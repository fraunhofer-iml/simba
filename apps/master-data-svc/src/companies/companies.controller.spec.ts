import { CompanyAmqpDto } from '@ap3/amqp';
import { DatabaseModule, GET_COMPANY_BY_ID_QUERY_MOCK, PrismaService } from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderAmqpMock } from '../../../../libs/amqp/src/lib/dtos/master-data-svc/mocks/company-amqp.mock';
import { CompaniesSeed } from '../../../../libs/database/src/seed';
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
    const expectedReturn: CompanyAmqpDto[] = OrderAmqpMock;

    const prismaSpy = jest.spyOn(prisma.company, 'findMany');
    prismaSpy.mockResolvedValue(CompaniesSeed);

    const retVal = await controller.findAll();
    expect(prisma.company.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOne: should return company by id', async () => {
    const expectedReturn = OrderAmqpMock[0];

    const prismaSpy = jest.spyOn(prisma.company, 'findUnique');
    prismaSpy.mockResolvedValue(CompaniesSeed[0]);

    const retVal = await controller.findOne(CompaniesSeed[0].id);
    expect(prisma.company.findUnique).toHaveBeenCalledWith(GET_COMPANY_BY_ID_QUERY_MOCK);
    expect(expectedReturn).toEqual(retVal);
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
