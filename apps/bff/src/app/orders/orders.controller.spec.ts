import { AmqpBrokerQueues, createOrderAmqpDtoWithoutPrismaConverterMock, OrderAmqpMock, OrderMessagePatterns } from '@ap3/amqp';
import { createOrderMock, OpenOffersMock, OrderOverviewDto, OrderOverviewMock, ProductDtoMocks } from '@ap3/api';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let processSvcClientProxy: ClientProxy;
  let productsService: ProductsService;
  let offersService: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: ProductsService,
          useValue: {
            loadProductRefs: jest.fn(),
          },
        },
        {
          provide: OffersService,
          useValue: {
            loadOfferRef: jest.fn(),
            createOffer: jest.fn(),
          },
        },
        {
          provide: AmqpBrokerQueues.PROCESS_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController) as OrdersController;
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
    productsService = module.get<ProductsService>(ProductsService) as ProductsService;
    offersService = module.get<OffersService>(OffersService) as OffersService;
  });

  it('should create an Order', async () => {
    const expectedReturnValue = OrderOverviewMock[0];

    const offersServiceCreateSpy = jest.spyOn(offersService, 'createOffer');
    const offersServiceLoadSpy = jest.spyOn(offersService, 'loadOfferRef');
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    const productServiceLoadSpy = jest.spyOn(productsService, 'loadProductRefs');

    offersServiceCreateSpy.mockResolvedValue(true);
    offersServiceLoadSpy.mockResolvedValue(OpenOffersMock[0]);
    productServiceLoadSpy.mockResolvedValue(ProductDtoMocks[0]);
    sendRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(OrderAmqpMock[0]);
    });

    const res: OrderOverviewDto = await controller.create(createOrderMock);

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.CREATE, createOrderAmqpDtoWithoutPrismaConverterMock);
    expect(offersServiceLoadSpy).toHaveBeenCalledWith(OrderAmqpMock[0]);
    expect(productServiceLoadSpy).toHaveBeenCalledWith(OrderAmqpMock[0]);
    expect(res).toEqual(expectedReturnValue);
  });
  it('should findAll Orders', async () => {
    const expectedReturnValue = OrderOverviewMock;

    const offersServiceLoadSpy = jest.spyOn(offersService, 'loadOfferRef');
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    const productServiceSpy = jest.spyOn(productsService, 'loadProductRefs');

    offersServiceLoadSpy.mockResolvedValueOnce(OpenOffersMock[0]);
    offersServiceLoadSpy.mockResolvedValueOnce(OpenOffersMock[1]);
    productServiceSpy.mockResolvedValueOnce(ProductDtoMocks[0]);
    productServiceSpy.mockResolvedValueOnce(ProductDtoMocks[0]);
    sendRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(OrderAmqpMock);
    });

    const res: OrderOverviewDto[] = await controller.findAll();

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });
  it('should find an Order by Id', async () => {
    const expectedReturnValue = OrderOverviewMock[0];

    const offersServiceLoadSpy = jest.spyOn(offersService, 'loadOfferRef');
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    const productServiceSpy = jest.spyOn(productsService, 'loadProductRefs');

    offersServiceLoadSpy.mockResolvedValueOnce(OpenOffersMock[0]);
    productServiceSpy.mockResolvedValueOnce(ProductDtoMocks[0]);
    sendRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(OrderAmqpMock[0]);
    });

    const res: OrderOverviewDto = await controller.findOne(OrderOverviewMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.READ_BY_ID, OrderOverviewMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });
  it('should delete an Order', async () => {
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');

    sendRequestSpy.mockImplementation((messagePattern: OrderMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.deleteOne(OrderOverviewMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OrderMessagePatterns.REMOVE_ORDER_BY_ID, OrderOverviewMock[0].id);
  });
});
