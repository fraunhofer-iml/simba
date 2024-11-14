import { AmqpBrokerQueues, CreateTradeReceivableAMQPMock, TradeReceivableMessagePatterns, TradeReceivablesAMQPMock } from '@ap3/amqp';
import { createTradeReceivableDtoMock, OrderDto, OrderDtosMock, TradeReceivableDto, TradeReceivableMocks } from '@ap3/api';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

describe('OrdersController', () => {
  let controller: TradeReceivablesController;
  let masterDataSvcClientProxy: ClientProxy;
  let processSvcClientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TradeReceivablesController],
      providers: [
        TradeReceivablesService,
        {
          provide: AmqpBrokerQueues.PROCESS_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
        {
          provide: AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TradeReceivablesController>(TradeReceivablesController) as TradeReceivablesController;
    masterDataSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) as ClientProxy;
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
  });

  it('should create a Tradereceivable', async () => {
    const expectedReturnValue = TradeReceivableMocks[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock[0]);
    });

    const res: TradeReceivableDto = await controller.create(OrderDtosMock[0].id, createTradeReceivableDtoMock);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.CREATE, CreateTradeReceivableAMQPMock);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all Tradereceivables by debtorId', async () => {
    const expectedReturnValue = TradeReceivableMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock);
    });

    const res: TradeReceivableDto[] = await controller.findAll('Debitor', '', '');
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_DEBTOR_ID, 'Debitor');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_CREDITOR_ID, '');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ORDER_ID, '');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all Tradereceivables by CreditorId', async () => {
    const expectedReturnValue = TradeReceivableMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock);
    });

    const res: TradeReceivableDto[] = await controller.findAll('', 'Kreditor', '');
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_CREDITOR_ID, 'Kreditor');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_DEBTOR_ID, '');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ORDER_ID, '');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all Tradereceivables by OrderId', async () => {
    const expectedReturnValue = TradeReceivableMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock);
    });

    const res: TradeReceivableDto[] = await controller.findAll('', '', 'Order');
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ORDER_ID, 'Order');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_CREDITOR_ID, '');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_DEBTOR_ID, '');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all Tradereceivables', async () => {
    const expectedReturnValue = TradeReceivableMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock);
    });

    const res: TradeReceivableDto[] = await controller.findAll('', '', '');
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, {});
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_CREDITOR_ID, '');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_DEBTOR_ID, '');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ORDER_ID, '');
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find a Tradereceivable ny its id', async () => {
    const expectedReturnValue = TradeReceivableMocks[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock[0]);
    });

    const res: TradeReceivableDto = await controller.findOne(TradeReceivableMocks[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ID, TradeReceivableMocks[0].id);
    expect(res).toEqual(expectedReturnValue);
  });
});
