import {
  AmqpBrokerQueues,
  CreateTradeReceivableAMQPMock,
  InvoicesAmqpMock,
  NotPaidTrStatisticsAmqpMock,
  PaidTrStatisticsAmqpMock,
  TradeReceivableMessagePatterns,
  TRParamsCompanyIdAndYear,
} from '@ap3/amqp';
import {
  createTradeReceivableDtoMock,
  InvoiceMocks,
  OrderDtosMock,
  PaidTrStatisticsMock,
  TradeReceivableMock,
  UnpaidTradeReceivableStatisticsMock,
  UnpaidTrStatisticsDto,
} from '@ap3/api';
import { CompaniesSeed } from '@ap3/database';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TradeReceivableAMQPMock } from '../../../../../libs/amqp/src/lib/dtos/process-svc/trade-receivable/mocks/trade-receivable-amqp.mock';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';

describe('OrdersController', () => {
  let controller: TradeReceivablesController;
  let processSvcClientProxy: ClientProxy;
  let request: any;

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
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
    request = {
      user: {
        company: CompaniesSeed[1].id,
      },
    };
  });

  it('should create a Tradereceivable', async () => {
    const expectedReturnValue = TradeReceivableMock[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TradeReceivableAMQPMock[0]);
    });

    const res = await controller.create(createTradeReceivableDtoMock);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.CREATE, CreateTradeReceivableAMQPMock);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable unpaid TR statistics by its companyId', async () => {
    const expectedReturnValue = UnpaidTradeReceivableStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(NotPaidTrStatisticsAmqpMock);
    });

    const res: UnpaidTrStatisticsDto = await controller.getStatisticUnpaidTrade(request);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_TR_STATISTICS_NOT_PAID, CompaniesSeed[1].id);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get Tradereceivable paid TR statistics by its companyId', async () => {
    const expectedReturnValue = PaidTrStatisticsMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(PaidTrStatisticsAmqpMock);
    });

    const res = await controller.getStatisticPaidTradePerMonth(request, 2024);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      TradeReceivableMessagePatterns.READ_TR_STATISTICS_PAID,
      new TRParamsCompanyIdAndYear(CompaniesSeed[1].id, 2024)
    );
    expect(res).toEqual(expectedReturnValue);
  });
});
