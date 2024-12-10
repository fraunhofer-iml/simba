import {
  AmqpBrokerQueues,
  CompanyAmqpDto,
  CompanyAmqpMock,
  CompanyIdAndInvoiceId,
  CompanyIdAndPaymentState,
  CompanyMessagePatterns,
  InvoiceMessagePatterns,
  InvoicesAmqpMock,
} from '@ap3/amqp';
import { InvoiceDto, InvoiceMocks } from '@ap3/api';
import { CompaniesSeed, PaymentStatesEnum } from '@ap3/database';
import { Observable, of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesModule } from '../companies/companies.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let masterDataSvcClientProxy: ClientProxy;
  let processSvcClientProxy: ClientProxy;
  let request: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CompaniesModule],
      controllers: [InvoicesController],
      providers: [
        InvoicesService,
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

    controller = module.get<InvoicesController>(InvoicesController) as InvoicesController;
    masterDataSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) as ClientProxy;
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;

    request = {
      user: {
        company: CompaniesSeed[1].id,
      },
    };
    const sendMasterDataRequestSpy = jest.spyOn(masterDataSvcClientProxy, 'send');
    sendMasterDataRequestSpy.mockImplementation((messagePattern: CompanyMessagePatterns, data: any) => {
      return data === 'pt0001' ? of(CompanyAmqpMock[0]) : of(CompanyAmqpMock[1]);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all invoices by OrderId', async () => {
    const expectedReturnValue = InvoiceMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(InvoicesAmqpMock);
    });

    const res: InvoiceDto[] = await controller.findAllByOrderId('Order');
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.READ_BY_ORDER_ID, 'Order');
    expect(sendRequestSpy).not.toHaveBeenCalledWith(InvoiceMessagePatterns.READ_ALL, {});
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find all invoices', async () => {
    const expectedReturnValue = InvoiceMocks;
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(InvoicesAmqpMock);
    });

    const res: InvoiceDto[] = await controller.findAllByOrderId('');
    expect(sendRequestSpy).toHaveBeenCalledWith(InvoiceMessagePatterns.READ_ALL, {});
    expect(sendRequestSpy).not.toHaveBeenCalledWith(InvoiceMessagePatterns.READ_BY_ORDER_ID, '');
    expect(res).toEqual(expectedReturnValue);
  });

  it('should find an invoice by its id', async () => {
    const expectedReturnValue = InvoiceMocks[0];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of(InvoicesAmqpMock[0]);
    });

    const res: InvoiceDto = await controller.findOne(request, InvoiceMocks[0].id);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.READ_BY_ID,
      new CompanyIdAndInvoiceId(CompaniesSeed[1].id, InvoiceMocks[0].id)
    );
    expect(res).toEqual(expectedReturnValue);
  });

  it('should get all invoices by creditor Id and payment state', async () => {
    const expectedReturnValue = [InvoiceMocks[0], InvoiceMocks[1]];
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementationOnce((messagePattern: InvoiceMessagePatterns, data: any) => {
      return of([InvoicesAmqpMock[0], InvoicesAmqpMock[1]]);
    });

    const res = await controller.findAllByPaymentState(request, PaymentStatesEnum.PAID);
    expect(sendRequestSpy).toHaveBeenCalledWith(
      InvoiceMessagePatterns.READ_ALL_BY_PAYMENT_STATE,
      new CompanyIdAndPaymentState(CompaniesSeed[1].id, PaymentStatesEnum.PAID)
    );
    expect(res).toEqual(expectedReturnValue);
  });
});
