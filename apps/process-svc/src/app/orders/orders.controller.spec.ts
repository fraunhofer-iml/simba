import { createOrderAmqpDtoMock, OrderAmqpMock } from '@ap3/amqp';
import {
  CompaniesSeed,
  createOrderQueryMock,
  DatabaseModule,
  findAllOrdersQueryMock,
  findSingleOrderMock,
  OrderOverviewPrismaMock,
  OrdersSeed,
  PrismaService,
  ServiceProcessesSeed,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let controller: OrdersController;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              findUniqueOrThrow: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            offer: {
              findUniqueOrThrow: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            serviceProcess: {
              update: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<OrdersController>(OrdersController) as OrdersController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an Order and find it by Id', async () => {
    const expectedReturn = OrderAmqpMock[0];
    const prismaCreateOrderSpy = jest.spyOn(prisma.order, 'create');
    const prismaFindManySpy = jest.spyOn(prisma.order, 'findMany');
    const prismaUpdateServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'update');

    prismaCreateOrderSpy.mockResolvedValue(OrdersSeed[0]);
    prismaFindManySpy.mockResolvedValue([OrderOverviewPrismaMock[0]]);
    prismaUpdateServiceProcessSpy.mockResolvedValue(ServiceProcessesSeed[0]);

    const retVal = await controller.create(createOrderAmqpDtoMock);

    expect(prisma.order.create).toHaveBeenCalledWith({ data: createOrderQueryMock });
    expect(prisma.order.findMany).toHaveBeenCalledWith(findSingleOrderMock);
    expect(retVal).toEqual(expectedReturn);
  });

  it('should find all Orders with their specific ServiceStatus', async () => {
    const expectedReturnValue = [OrderAmqpMock[1]];
    const prismaFindManySpy = jest.spyOn(prisma.order, 'findMany');

    prismaFindManySpy.mockResolvedValue(OrderOverviewPrismaMock);

    const res = await controller.findAll(CompaniesSeed[0].id);

    expect(prisma.order.findMany).toHaveBeenCalledWith(findAllOrdersQueryMock);
    expect(expectedReturnValue).toEqual(res);
  });

  it('should find one Order by Id', async () => {
    const expectedReturnValue = OrderAmqpMock[0];
    const prismaFindManySpy = jest.spyOn(prisma.order, 'findMany');

    prismaFindManySpy.mockResolvedValue([OrderOverviewPrismaMock[0]]);

    const res = await controller.findOne(OrderOverviewPrismaMock[0].id);

    expect(prisma.order.findMany).toHaveBeenCalledWith(findSingleOrderMock);
    expect(expectedReturnValue).toEqual(res);
  });
});
