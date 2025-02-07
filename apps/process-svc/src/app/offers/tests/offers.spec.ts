import { OfferAmqpMock } from '@ap3/amqp';
import {
  createOfferQuery,
  DatabaseModule,
  OffersSeed,
  OrdersSeed,
  PrismaService,
  queryOffersToShowWithOrder,
  queryOpenOffersByOrderId,
  queryUniqueOrThrow,
  ServiceProcessesSeed,
  setOfferStateToDeclinedQuery,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from '../offers.controller';
import { OffersService } from '../offers.service';

describe('OfferController', () => {
  let controller: OffersController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [OffersController],
      providers: [
        OffersService,
        {
          provide: PrismaService,
          useValue: {
            order: {
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
    controller = module.get<OffersController>(OffersController) as OffersController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create: should create new offers for an order id', async () => {
    const prismaSpy = jest.spyOn(prisma.offer, 'create');
    prismaSpy.mockResolvedValue(OffersSeed[0]);

    const expectedReturn = true;
    const retVal = await controller.create(ServiceProcessesSeed[0].orderId);

    expect(prisma.offer.create).toHaveBeenCalledWith({ data: createOfferQuery });
    expect(prisma.offer.create).toHaveBeenCalledTimes(4);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAll: should return all offers', async () => {
    const expectedReturn = OfferAmqpMock;
    const prismaSpy = jest.spyOn(prisma.offer, 'findMany');
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');

    prismaServiceProcessSpy
      .mockResolvedValueOnce(ServiceProcessesSeed[0])
      .mockResolvedValueOnce(ServiceProcessesSeed[0])
      .mockResolvedValueOnce(ServiceProcessesSeed[0])
      .mockResolvedValueOnce(ServiceProcessesSeed[0])
      .mockResolvedValueOnce(ServiceProcessesSeed[1])
      .mockResolvedValueOnce(ServiceProcessesSeed[1]);
    prismaSpy.mockResolvedValue([OffersSeed[0], OffersSeed[1], OffersSeed[2], OffersSeed[3], OffersSeed[4], OffersSeed[5]]);

    const retVal = await controller.findAll();
    expect(prisma.offer.findMany).toHaveBeenCalled();
    expect(retVal).toEqual(expectedReturn);
  });

  it('findAllByOrderId: should return offers by order id', async () => {
    const expectedReturn = [OfferAmqpMock[0], OfferAmqpMock[1], OfferAmqpMock[2], OfferAmqpMock[3]];
    const prismaSpy = jest.spyOn(prisma.offer, 'findMany');
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');

    prismaServiceProcessSpy.mockResolvedValue(ServiceProcessesSeed[0]);
    prismaSpy.mockResolvedValue([OffersSeed[0], OffersSeed[1], OffersSeed[2], OffersSeed[3]]);

    const retVal = await controller.findAllByOrderId(expectedReturn[0].orderId);
    expect(prisma.offer.findMany).toHaveBeenCalledWith(queryOffersToShowWithOrder);
    expect(retVal).toEqual(expectedReturn);
  });

  it('findOne: should return a specific', async () => {
    const expectedReturn = OfferAmqpMock[0];
    const prismaSpy = jest.spyOn(prisma.offer, 'findUniqueOrThrow');
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');

    prismaServiceProcessSpy.mockResolvedValue(ServiceProcessesSeed[0]);
    prismaSpy.mockResolvedValue(OffersSeed[0]);

    const retVal = await controller.findOne(expectedReturn.id);
    expect(prisma.offer.findUniqueOrThrow).toHaveBeenCalled();
    expect(prisma.offer.findUniqueOrThrow).toHaveBeenCalledWith(queryUniqueOrThrow);
    expect(expectedReturn).toEqual(retVal);
  });

  it('acceptOffer: should accept one offer and decline all other offers of an order', async () => {
    const expectedReturn = OfferAmqpMock[0];
    const prismaOrderUpdateSpy = jest.spyOn(prisma.order, 'update');
    const prismaOfferUpdateSpy = jest.spyOn(prisma.offer, 'update');
    const prismaServiceProcessUpdateSpy = jest.spyOn(prisma.serviceProcess, 'update');
    const prismaFindManySpy = jest.spyOn(prisma.offer, 'findMany');
    const prismaServiceProcessFindUniqueSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');

    prismaServiceProcessUpdateSpy.mockResolvedValue(ServiceProcessesSeed[0]);
    prismaServiceProcessFindUniqueSpy.mockResolvedValue(ServiceProcessesSeed[0]);
    prismaFindManySpy.mockResolvedValue(OffersSeed.slice(1, 4));
    prismaOrderUpdateSpy.mockResolvedValue(OrdersSeed[0]);
    prismaOfferUpdateSpy.mockResolvedValue(OffersSeed[0]);

    const retVal = await controller.acceptOffer(OffersSeed[0].id);

    expect(prismaOfferUpdateSpy).toHaveBeenLastCalledWith(setOfferStateToDeclinedQuery);
    expect(prismaFindManySpy).toHaveBeenCalledWith(queryOpenOffersByOrderId);
    expect(prismaOfferUpdateSpy).toHaveBeenCalledWith(setOfferStateToDeclinedQuery);
    expect(prismaOfferUpdateSpy).toHaveBeenCalledTimes(4);
    expect(retVal).toEqual(expectedReturn);
  });
});
