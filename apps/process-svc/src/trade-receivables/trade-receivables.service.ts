import util from 'node:util';
import { CreateTradeReceivableAmqpDto, TradeReceivableAmqpDto } from '@ap3/amqp';
import { InvoicePrismaService, OrderPrismaService, ServiceProcessPrismaService, TradeReceivablePrismaService } from '@ap3/database';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Invoice, OrderStatus, ServiceProcess, TradeReceivable } from '@prisma/client';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);
  constructor(
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly invoicePrismaService: InvoicePrismaService,
    private readonly orderPrismaService: OrderPrismaService,
    private readonly serviceProcessService: ServiceProcessPrismaService
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    this.logger.verbose(`create trade receivable ${util.inspect(createTradeReceivableDto)}`);
    try {
      const createTradeReceivable = createTradeReceivableDto.toPrismaCreateEntity();
      const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.createTradeReceivable(createTradeReceivable);
      const relatedInvoice: Invoice = await this.invoicePrismaService.getInvoiceById(tradeReceivable.invoiceId);
      const serviceProcess: ServiceProcess = await this.serviceProcessService.getServiceProcessById(relatedInvoice.id);
      const orderStatus: OrderStatus = await this.orderPrismaService.getLatestOrderStatus(serviceProcess.orderId);
      if (tradeReceivable) {
        return TradeReceivableAmqpDto.fromPrismaEntity(tradeReceivable, relatedInvoice, orderStatus);
      } else {
        throw new InternalServerErrorException(`Could not create trade receivable ${util.inspect(createTradeReceivableDto)}`);
      }
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findAll(): Promise<TradeReceivableAmqpDto[]> {
    this.logger.verbose('requesting all trade receivables');
    let tradeReceivables: TradeReceivable[] = [];
    try {
      tradeReceivables = await this.tradeReceivablePrismaService.getAll();
      return this.loadAssociatedDataAndConvertToDTO(tradeReceivables);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findByDebtor(debtorId: string): Promise<TradeReceivableAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables of debtor #${debtorId}`);
    let tradeReceivables: TradeReceivable[] = [];
    try {
      tradeReceivables = await this.tradeReceivablePrismaService.getAllTradeReceivableByDebtorId(debtorId);
      this.logger.debug('Response from postgres database', util.inspect(tradeReceivables));
      return this.loadAssociatedDataAndConvertToDTO(tradeReceivables);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findByCreditor(creditorId: string): Promise<TradeReceivableAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables of creditor #${creditorId}`);
    let tradeReceivables: TradeReceivable[] = [];
    try {
      tradeReceivables = await this.tradeReceivablePrismaService.getAllTradeReceivableByCreditorId(creditorId);
      return this.loadAssociatedDataAndConvertToDTO(tradeReceivables);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findByOrder(orderId: string): Promise<TradeReceivableAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables of order #${orderId}`);
    let tradeReceivables: TradeReceivable[] = [];
    try {
      tradeReceivables = await this.tradeReceivablePrismaService.getAllTradeReceivableByOrderId(orderId);
      return this.loadAssociatedDataAndConvertToDTO(tradeReceivables);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findOne(id: string): Promise<TradeReceivableAmqpDto> {
    const relatedInvoice: Invoice = await this.invoicePrismaService.getInvoiceById(id);
    const serviceProcess: ServiceProcess = await this.serviceProcessService.getServiceProcessById(relatedInvoice.id);
    const orderStatus: OrderStatus = await this.orderPrismaService.getLatestOrderStatus(serviceProcess.orderId);
    return TradeReceivableAmqpDto.fromPrismaEntity(
      await this.tradeReceivablePrismaService.getOneTradeReceivableById(id),
      relatedInvoice,
      orderStatus
    );
  }

  private async loadAssociatedDataAndConvertToDTO(tradeReceivables: TradeReceivable[]): Promise<TradeReceivableAmqpDto[]> {
    const tradeReceivableDtos: TradeReceivableAmqpDto[] = [];
    for (const tr of tradeReceivables) {
      const relatedInvoice: Invoice = await this.invoicePrismaService.getInvoiceById(tr.invoiceId);
      this.logger.debug('related invoice: ', util.inspect(relatedInvoice));
      const serviceProcess: ServiceProcess = await this.serviceProcessService.getServiceProcessById(relatedInvoice.serviceProcessId);
      this.logger.debug('related serviceProcess: ', util.inspect(serviceProcess));
      const orderStatus: OrderStatus = await this.orderPrismaService.getLatestOrderStatus(serviceProcess.orderId);
      this.logger.debug('related orderStatus: ', util.inspect(orderStatus));
      tradeReceivableDtos.push(TradeReceivableAmqpDto.fromPrismaEntity(tr, relatedInvoice, orderStatus));
    }
    return tradeReceivableDtos;
  }
}
