import {
  AmqpBrokerQueues,
  CreateTradeReceivableAMQPMock,
  NotPaidTrStatisticsAmqpMock,
  PaidTrStatisticsAmqpMock,
  TradeReceivableMessagePatterns,
  TradeReceivablesAMQPMock,
  TRParamsCompanyIdAndPaymentState,
  TRParamsCompanyIdAndYear,
} from '@ap3/amqp';
import {
  createTradeReceivableDtoMock,
  OrderDtosMock,
  PaidTrStatisticsMock,
  TradeReceivableDto,
  TradeReceivableMocks,
  UnpaidTradeReceivableStatisticsMock,
  UnpaidTrStatisticsDto,
} from '@ap3/api';
import { CompaniesSeed, PaymentStatesEnum } from '@ap3/database';
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

  it('should find all Tradereceivables by OrderId', async () => {
    const expectedReturnValue = TradeReceivableMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock);
    });

    const res: TradeReceivableDto[] = await controller.findAll('Order');
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ORDER_ID, 'Order');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all Tradereceivables', async () => {
    const expectedReturnValue = TradeReceivableMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock);
    });

    const res: TradeReceivableDto[] = await controller.findAll('');
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, {});
    expect(sendRequestSpy).not.toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ORDER_ID, '');
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find a Tradereceivable by its id', async () => {
    const expectedReturnValue = TradeReceivableMocks[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivablesAMQPMock[0]);
    });

    const res: TradeReceivableDto = await controller.findOne(TradeReceivableMocks[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ID, TradeReceivableMocks[0].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get all Tradereceivables by creditor Id and payment state', async () => {
    const expectedReturnValue = [TradeReceivableMocks[0], TradeReceivableMocks[1]];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of([TradeReceivablesAMQPMock[0], TradeReceivablesAMQPMock[1]]);
    });

    const res = await controller.findAllByPaymentState(PaymentStatesEnum.PAID);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      TradeReceivableMessagePatterns.READ_ALL_BY_PAYMENT_STATE,
      new TRParamsCompanyIdAndPaymentState(CompaniesSeed[1].id, PaymentStatesEnum.PAID)
    );
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable unpaid TR statistics by its companyId', async () => {
    const expectedReturnValue = UnpaidTradeReceivableStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(NotPaidTrStatisticsAmqpMock);
    });

    const res: UnpaidTrStatisticsDto = await controller.getStatisticUnpaidTrade();
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_TR_STATISTICS_NOT_PAID, CompaniesSeed[1].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable paid TR statistics by its companyId', async () => {
    const expectedReturnValue = PaidTrStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(PaidTrStatisticsAmqpMock);
    });

    const res = await controller.getStatisticPaidTradePerMonth(2024);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      TradeReceivableMessagePatterns.READ_TR_STATISTICS_PAID,
      new TRParamsCompanyIdAndYear(CompaniesSeed[1].id, 2024)
    );
    expect(res).toEqual(expectedReturnValue);
  });
});
