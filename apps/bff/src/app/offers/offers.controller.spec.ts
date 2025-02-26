import { AmqpBrokerQueues, OfferMessagePatterns } from '@ap3/amqp';
import { OfferDto, OpenOffersMock, OrderDtosMock } from '@ap3/api';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

describe('OffersController', () => {
  let controller: OffersController;
  let clientProxy: ClientProxy;
  let offersService: OffersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OffersController],
      providers: [
        OffersService,
        {
          provide: AmqpBrokerQueues.PROCESS_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OffersController>(OffersController);
    clientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
    offersService = module.get<OffersService>(OffersService);
  });

  it('should find all Offers', async () => {
    const expectedReturnValue: OfferDto[] = OpenOffersMock;
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(OpenOffersMock);
    });

    const res: OfferDto[] = await controller.findAll();

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all Offers by their OrderId', async () => {
    const expectedReturnValue: OfferDto[] = OpenOffersMock;
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(OpenOffersMock);
    });

    const res: OfferDto[] = await controller.findAll(OrderDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_BY_ORDER_ID, OrderDtosMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });
  it('should find a single offer by Id', async () => {
    const expectedReturnValue: OfferDto = OpenOffersMock[0];
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(OpenOffersMock[0]);
    });

    const res: OfferDto = await controller.findOne(OpenOffersMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.READ_BY_ID, OpenOffersMock[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should accept an Offer by its Id', async () => {
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.acceptOffer(OpenOffersMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.ACCEPT_BY_ID, OpenOffersMock[0].id);
  });

  it('should Decline all unaccepted Offers by their orderId', async () => {
    const sendRequestSpy = jest.spyOn(clientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: OfferMessagePatterns, data: any) => {
      return of(true);
    });

    await controller.declineOffers(OrderDtosMock[0].id);

    expect(sendRequestSpy).toHaveBeenCalledWith(OfferMessagePatterns.DECLINE_ALL_OF_ORDER, OrderDtosMock[0].id);
  });
});
