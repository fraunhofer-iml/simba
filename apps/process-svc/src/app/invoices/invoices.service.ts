import util from 'node:util';
import { InvoiceAmqpDto, TRParamsCompanyIdAndPaymentState } from '@ap3/amqp';
import { InvoicePrismaService, TradeReceivablePrismaService } from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';
import { Invoice, PaymentStatus, TradeReceivable } from '@prisma/client';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  constructor(
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly invoicePrismaService: InvoicePrismaService
  ) {}

  async findAll(): Promise<InvoiceAmqpDto[]> {
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

  async findByDebtor(debtorId: string): Promise<InvoiceAmqpDto[]> {
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

  async findByCreditor(creditorId: string): Promise<InvoiceAmqpDto[]> {
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

  async findByOrder(orderId: string): Promise<InvoiceAmqpDto[]> {
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

  async findOne(id: string): Promise<InvoiceAmqpDto> {
    const invoice: Invoice = await this.invoicePrismaService.getInvoiceById(id);
    const tr: TradeReceivable = await this.tradeReceivablePrismaService.getOneTRByInvoiceId(id);
    let trStates: PaymentStatus[] = [];
    if(tr){
      trStates = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tr.id);
    }

    return InvoiceAmqpDto.fromPrismaEntity(tr, invoice, trStates);
  }

  async findInvoiceByPaymentStateAndCreditorId(params: TRParamsCompanyIdAndPaymentState): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables with payment state #${params.paymentState}`);
    return this.loadAssociatedDataAndConvertToDTO(
      await this.tradeReceivablePrismaService.getTradeReceivableByPaymentStatus(params.paymentState, params.companyId)
    );
  }

  private async loadAssociatedDataAndConvertToDTO(tradeReceivables: TradeReceivable[]): Promise<InvoiceAmqpDto[]> {
    const tradeReceivableDtos: InvoiceAmqpDto[] = [];
    this.logger.verbose(util.inspect(tradeReceivables));
    for (const tr of tradeReceivables) {
      const relatedInvoice: Invoice = await this.invoicePrismaService.getInvoiceById(tr.invoiceId);

      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tr.id);
      tradeReceivableDtos.push(InvoiceAmqpDto.fromPrismaEntity(tr, relatedInvoice, trStates));
    }
    return tradeReceivableDtos;
  }
}
