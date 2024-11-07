import util from 'node:util';
import { CreateTradeReceivableAmqpDto, TradeReceivableAmqpDto } from '@ap3/amqp';
import { InvoicePrismaService, TradeReceivablePrismaService } from '@ap3/database';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Invoice, PaymentStatus, TradeReceivable } from '@prisma/client';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);
  constructor(
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly invoicePrismaService: InvoicePrismaService
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    this.logger.verbose(`create trade receivable ${util.inspect(createTradeReceivableDto)}`);
    try {
      const createTradeReceivable = createTradeReceivableDto.toPrismaCreateEntity();
      const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.createTradeReceivable(createTradeReceivable);
      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tradeReceivable.id);

      const relatedInvoice: Invoice = await this.invoicePrismaService.getInvoiceById(tradeReceivable.invoiceId);
      if (tradeReceivable) {
        return TradeReceivableAmqpDto.fromPrismaEntity(tradeReceivable, relatedInvoice, trStates);
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
    const tr: TradeReceivable = await this.tradeReceivablePrismaService.getOneTradeReceivableById(id);

    const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tr.id);
    return TradeReceivableAmqpDto.fromPrismaEntity(tr, relatedInvoice, trStates);
  }

  private async loadAssociatedDataAndConvertToDTO(tradeReceivables: TradeReceivable[]): Promise<TradeReceivableAmqpDto[]> {
    const tradeReceivableDtos: TradeReceivableAmqpDto[] = [];
    for (const tr of tradeReceivables) {
      const relatedInvoice: Invoice = await this.invoicePrismaService.getInvoiceById(tr.invoiceId);
      this.logger.debug('related invoice: ', util.inspect(relatedInvoice));

      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tr.id);
      tradeReceivableDtos.push(TradeReceivableAmqpDto.fromPrismaEntity(tr, relatedInvoice, trStates));
    }
    return tradeReceivableDtos;
  }
}
