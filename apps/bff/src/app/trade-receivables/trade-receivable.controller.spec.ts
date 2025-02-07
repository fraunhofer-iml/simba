import { AmqpBrokerQueues, CreateTradeReceivableAMQPMock, TradeReceivableAMQPMock, TradeReceivableMessagePatterns } from '@ap3/amqp';
import { createTradeReceivableDtoMock, TokenReadDtoMock, TradeReceivableMock } from '@ap3/api';
import { CompaniesSeed } from '@ap3/database';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';
import { TokenReadDto } from 'nft-folder-blockchain-connector';

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

  it('should read all nfts', async () => {
    const expectedReturnValue = [TokenReadDtoMock];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of([TokenReadDtoMock]);
    });

    const res: TokenReadDto[] = await controller.readAllNfts();
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_ALL, []);
    expect(res).toEqual(expectedReturnValue);
  });

  it('should read a single nft', async () => {
    const inputTradeReceivableId = 'testId';
    const expectedReturnValue = TokenReadDtoMock;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: TradeReceivableMessagePatterns, data: any) => {
      return of(TokenReadDtoMock);
    });

    const res: TokenReadDto[] = await controller.readNftByTradeReceivableId(inputTradeReceivableId);
    expect(sendRequestSpy).toHaveBeenCalledWith(TradeReceivableMessagePatterns.READ_BY_ID, inputTradeReceivableId);
    expect(res).toEqual(expectedReturnValue);
  });
});
