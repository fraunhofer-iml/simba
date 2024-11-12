import { createOrderAmqpDtoMock, OrderAmqpMock } from '@ap3/amqp';
import {
  createOrderQueryMock,
  DatabaseModule,
  findAllOrdersQueryMock,
  findLatestServiceStatusQuery,
  findSingleOrderMock,
  orderOverviewMock,
  ordersMock,
  PrismaService,
  serviceProcessMock,
  serviceStatusMock,
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

    prismaCreateOrderSpy.mockResolvedValue(ordersMock[0]);
    prismaFindManySpy.mockResolvedValue([orderOverviewMock[0]]);
    prismaUpdateServiceProcessSpy.mockResolvedValue(serviceProcessMock[0]);

    const retVal = await controller.create(createOrderAmqpDtoMock);

    expect(prisma.order.create).toHaveBeenCalledWith({ data: createOrderQueryMock });
    expect(prisma.order.findMany).toHaveBeenCalledWith(findSingleOrderMock);
    expect(retVal).toEqual(expectedReturn);
  });

  it('should find all Orders with their specific ServiceStatus', async () => {
    const expectedReturnValue = [OrderAmqpMock[0]];
    const prismaFindManySpy = jest.spyOn(prisma.order, 'findMany');
    const prismaFindLatestStatusSpy = jest.spyOn(prisma.serviceStatus, 'findFirst');

    prismaFindManySpy.mockResolvedValue(orderOverviewMock);
    prismaFindLatestStatusSpy.mockResolvedValueOnce(serviceStatusMock[0]).mockResolvedValueOnce(serviceStatusMock[1]);

    const res = await controller.findAll();

    expect(prisma.order.findMany).toHaveBeenCalledWith(findAllOrdersQueryMock);
    expect(prismaFindLatestStatusSpy).toHaveBeenCalledTimes(2);
    expect(prismaFindLatestStatusSpy).toHaveBeenLastCalledWith(findLatestServiceStatusQuery[1]);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find one Order by Id', async () => {
    const expectedReturnValue = OrderAmqpMock[0];
    const prismaFindManySpy = jest.spyOn(prisma.order, 'findMany');

    prismaFindManySpy.mockResolvedValue([orderOverviewMock[0]]);

    const res = await controller.findOne(orderOverviewMock[0].id);

    expect(prisma.order.findMany).toHaveBeenCalledWith(findSingleOrderMock);
    expect(res).toEqual(expectedReturnValue);
  });
});
