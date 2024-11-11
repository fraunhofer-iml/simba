import { ProductAmqpDto } from '@ap3/amqp';
import { DatabaseModule, GET_PRODUCT_BY_ID_QUERY_MOCK, PrismaService, productsMock } from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductAmqpMock } from '../../../../libs/amqp/src/lib/dtos/master-data-svc/mocks/product-amqp.mock';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2024-08-16T10:09:41.295Z'));
    controller = module.get<ProductsController>(ProductsController) as ProductsController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll: should return all products', async () => {
    const expectedReturn: ProductAmqpDto[] = ProductAmqpMock;

    const prismaSpy = jest.spyOn(prisma.product, 'findMany');
    prismaSpy.mockResolvedValue(productsMock);

    const retVal = await controller.findAll();
    expect(prisma.product.findMany).toHaveBeenCalled();
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOne: should return product by id', async () => {
    const expectedReturn = ProductAmqpMock[0];

    const prismaSpy = jest.spyOn(prisma.product, 'findUnique');
    prismaSpy.mockResolvedValue(productsMock[0]);

    const retVal = await controller.findOne(productsMock[0].id);
    expect(prisma.product.findUnique).toHaveBeenCalledWith(GET_PRODUCT_BY_ID_QUERY_MOCK);
    expect(expectedReturn).toEqual(retVal);
  });

  it('findOne: should throw if not present in database', async () => {
    const prismaSpy = jest.spyOn(prisma.product, 'findUnique');
    prismaSpy.mockResolvedValue(null);

    await expect(async () => {
      await controller.findOne(productsMock[0].id);
    }).rejects.toThrow();
    expect(prisma.product.findUnique).toHaveBeenCalledWith(GET_PRODUCT_BY_ID_QUERY_MOCK);
  });
});
