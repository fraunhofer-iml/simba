import { OfferAmqpDto } from '@ap3/amqp';
import {
  DatabaseModule,
  offersAmqpMock,
  offersMock,
  ordersMock,
  PrismaService,
  queryOffersToShowWithOrder,
  queryOpenOffersByOrderId,
  serviceProcessMock,
  setOfferStateToDeclinedQuery,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

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
    prismaSpy.mockResolvedValue(offersMock[0]);

    const expectedReturn = true;
    const retVal = await controller.create(ordersMock[1].id);

    /*     expect(prisma.offer.create).toHaveBeenCalledWith({ createOfferQuery }); */
    expect(prisma.offer.create).toBeCalledTimes(offersMock.length);
    expect(expectedReturn).toEqual(retVal);
    //wird 4 mal mit unterschiedlichen werten aufgerufen, tohavebeencalledwith wirft error
  });

  it('findAll: should return all offers', async () => {
    const expectedReturn = OfferAmqpDto.fromPrismaEntities(offersMock, ordersMock[1].id);
    const prismaSpy = jest.spyOn(prisma.offer, 'findMany');
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');

    prismaServiceProcessSpy.mockResolvedValue(serviceProcessMock[1]);
    prismaSpy.mockResolvedValue(offersMock);

    const retVal = await controller.findAll();
    expect(prisma.offer.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findAllByOrderId: should return offers by order id', async () => {
    const expectedReturn = OfferAmqpDto.fromPrismaEntities(offersMock, ordersMock[1].id);
    const prismaSpy = jest.spyOn(prisma.offer, 'findMany');
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');

    prismaServiceProcessSpy.mockResolvedValue(serviceProcessMock[1]);
    prismaSpy.mockResolvedValue(offersMock);

    const query = queryOffersToShowWithOrder;

    const retVal = await controller.findAllByOrderId(expectedReturn[0].orderId);
    expect(prisma.offer.findMany).toHaveBeenCalledWith(query);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOne: should return a specific', async () => {
    const expectedReturn = OfferAmqpDto.fromPrismaEntity(offersMock[0], ordersMock[1].id);
    const prismaSpy = jest.spyOn(prisma.offer, 'findUniqueOrThrow');
    const prismaServiceProcessSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');

    prismaServiceProcessSpy.mockResolvedValue(serviceProcessMock[1]);
    prismaSpy.mockResolvedValue(offersMock[0]);

    const retVal = await controller.findOne(expectedReturn.id);
    expect(prisma.offer.findUniqueOrThrow).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('acceptOffer: should accept one offer and decline all other offers of an order', async () => {
    const expectedReturn = offersAmqpMock[0];
    const prismaOrderUpdateSpy = jest.spyOn(prisma.order, 'update');
    const prismaOfferUpdateSpy = jest.spyOn(prisma.offer, 'update');
    const prismaServiceProcessUpdateSpy = jest.spyOn(prisma.serviceProcess, 'update');
    const prismaFindManySpy = jest.spyOn(prisma.offer, 'findMany');
    const prismaServiceProcessFindUniqueSpy = jest.spyOn(prisma.serviceProcess, 'findUnique');

    prismaServiceProcessUpdateSpy.mockResolvedValue(serviceProcessMock[0]);
    prismaServiceProcessFindUniqueSpy.mockResolvedValue(serviceProcessMock[0]);
    prismaFindManySpy.mockResolvedValue(offersMock.slice(1, 4));
    prismaOrderUpdateSpy.mockResolvedValue(ordersMock[0]);
    prismaOfferUpdateSpy.mockResolvedValue(offersMock[0]);

    const retVal = await controller.acceptOffer(offersMock[0].id);

    expect(prismaOfferUpdateSpy).toHaveBeenLastCalledWith(setOfferStateToDeclinedQuery);
    expect(prismaFindManySpy).toHaveBeenCalledWith(queryOpenOffersByOrderId);
    expect(prismaOfferUpdateSpy).toHaveBeenCalledWith(setOfferStateToDeclinedQuery);
    expect(prismaOfferUpdateSpy).toBeCalledTimes(offersMock.length);
    expect(retVal).toEqual(expectedReturn);
  });
});
