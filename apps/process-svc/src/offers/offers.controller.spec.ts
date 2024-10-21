import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import {createOffersMock, DatabaseModule, offersMock, ordersMock, PrismaService} from "@ap3/database";
import {OfferAmqpDto} from "@ap3/amqp";
import {
  createOfferQuery,
  setOfferStateToAcceptedQuery,
  setOfferStateToDeclinedQuery,
  setOrderStateToAcceptedQuery
} from "../../../bff/src/orders/test-mocks/create-offer.mock";
import {queryOffersToShowWithOrder, queryOpenOffersByOrderId, queryUniqueOrThrow} from "../../../bff/src/orders/test-mocks/query-offers.mock";

describe('OfferController', () => {
  let controller: OffersController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [OffersController],
      providers: [OffersService,
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
    prismaSpy.mockResolvedValue(createOffersMock[0]);
    const data = createOfferQuery;

    const expectedReturn = true;
    const retVal = await controller.create(createOffersMock[0].orderId);

    expect(prisma.offer.create).toHaveBeenCalledWith({data});
    expect(prisma.offer.create).toBeCalledTimes(createOffersMock.length);
    expect(expectedReturn).toEqual(retVal);
  })

  it('findAll: should return all orders', async () => {
    const expectedReturn = OfferAmqpDto.fromPrismaEntities(offersMock);
    const prismaSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaSpy.mockResolvedValue(offersMock);

    const retVal = await controller.findAll();
    expect(prisma.offer.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  })

  it('findAllByOrderId: should return offers by order id', async () => {
    const expectedReturn = OfferAmqpDto.fromPrismaEntities(offersMock);
    const prismaSpy = jest.spyOn(prisma.offer, 'findMany');
    prismaSpy.mockResolvedValue(offersMock);

    const query= queryOffersToShowWithOrder;

    const retVal = await controller.findAllByOrderId(expectedReturn[0].orderId);
    expect(prisma.offer.findMany).toHaveBeenCalledWith(query);
    expect(expectedReturn).toEqual(retVal);
  })

  it('findOne: should return a specific', async () => {
    const expectedReturn = OfferAmqpDto.fromPrismaEntity(offersMock[0]);
    const prismaSpy = jest.spyOn(prisma.offer, 'findUniqueOrThrow');
    prismaSpy.mockResolvedValue(offersMock[0]);

    const retVal = await controller.findOne(expectedReturn.id);
    expect(prisma.offer.findUniqueOrThrow).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  })

  it('acceptOffer: should accept one offer and decline all other offers of an order', async () => {
    const expectedReturn = createOffersMock[0];
    const prismaOrderUpdateSpy = jest.spyOn(prisma.order, 'update');
    const prismaOfferUpdateSpy = jest.spyOn(prisma.offer, 'update');
    const prismaFindManySpy = jest.spyOn(prisma.offer, 'findMany');
    const prismaFindUniqueSpy = jest.spyOn(prisma.offer, 'findUniqueOrThrow');

    prismaFindManySpy.mockResolvedValue(createOffersMock.slice(1,4));
    prismaOrderUpdateSpy.mockResolvedValue(ordersMock[0])
    prismaOfferUpdateSpy.mockResolvedValue(createOffersMock[0]);
    prismaFindUniqueSpy.mockResolvedValue(createOffersMock[0])

    const retVal = await controller.acceptOffer(createOffersMock[0].id);

    expect(prismaFindUniqueSpy).toHaveBeenCalledWith(queryUniqueOrThrow);

    expect(prismaOfferUpdateSpy).toHaveBeenCalledWith(setOfferStateToAcceptedQuery);

    expect(prismaFindManySpy).toHaveBeenCalledWith(queryOpenOffersByOrderId);

    expect(prismaOfferUpdateSpy).toHaveBeenCalledWith(setOfferStateToDeclinedQuery);
    expect(prismaOfferUpdateSpy).toBeCalledTimes(createOffersMock.length);

    expect(prismaOrderUpdateSpy).toHaveBeenCalledWith(setOrderStateToAcceptedQuery);

    expect(retVal).toEqual(expectedReturn);
  })
});
