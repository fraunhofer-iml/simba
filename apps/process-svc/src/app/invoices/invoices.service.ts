import util from 'node:util';
import { CompanyIdAndInvoiceId, CompanyIdAndOrderId, CompanyIdAndPaymentState, InvoiceAmqpDto } from '@ap3/amqp';
import { InvoicePrismaService, InvoiceWithNFT, TradeReceivablePrismaService } from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';
import { Invoice, PaymentStatus, TradeReceivable } from '@prisma/client';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  constructor(
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly invoicePrismaService: InvoicePrismaService
  ) {}

  async findAll(companyId: string): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables for ${companyId}`);
    try {
      const invoices: InvoiceWithNFT[] = await this.invoicePrismaService.getInvoicesCorrespondingToCompany(companyId);
      return this.loadAssociatedDataAndConvertToDTO(invoices);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findByDebtor(debtorId: string): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables of debtor #${debtorId}`);
    try {
      const invoices: InvoiceWithNFT[] = await this.invoicePrismaService.getInvoicesByDebtorId(debtorId);
      return this.loadAssociatedDataAndConvertToDTO(invoices);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findByCreditor(creditorId: string): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables of creditor #${creditorId}`);
    try {
      const invoices: InvoiceWithNFT[] = await this.invoicePrismaService.getInvoicesByCreditorId(creditorId);
      return this.loadAssociatedDataAndConvertToDTO(invoices);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findByOrder(params: CompanyIdAndOrderId): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables of order #${util.inspect(params)}`);
    try {
      const invoices: InvoiceWithNFT[] = await this.invoicePrismaService.getInvoicesByOrderId(params.orderId, params.companyId);
      return this.loadAssociatedDataAndConvertToDTO(invoices);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findOne(params: CompanyIdAndInvoiceId): Promise<InvoiceAmqpDto> {
    const invoice: InvoiceWithNFT = await this.invoicePrismaService.getInvoiceById(params.invoiceId, params.companyId);
    return (await this.loadAssociatedDataAndConvertToDTO([invoice]))[0];
  }

  async findInvoiceByPaymentStateAndCreditorId(params: CompanyIdAndPaymentState): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables with payment state #${params.paymentState}`);
    return this.loadTRAssociatedDataAndConvertToDTO(
      await this.tradeReceivablePrismaService.getTradeReceivableByPaymentStatus(params.paymentState, params.companyId),
      params.companyId
    );
  }

  private async loadTRAssociatedDataAndConvertToDTO(tradeReceivables: TradeReceivable[], companyId: string): Promise<InvoiceAmqpDto[]> {
    const tradeReceivableDtos: InvoiceAmqpDto[] = [];
    for (const tr of tradeReceivables) {
      const relatedInvoice: Invoice = await this.invoicePrismaService.getInvoiceById(tr.invoiceId, companyId);

      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tr.id);
      tradeReceivableDtos.push(InvoiceAmqpDto.fromTRPrismaEntity(tr, relatedInvoice, trStates));
    }
    return tradeReceivableDtos;
  }

  private async loadAssociatedDataAndConvertToDTO(invoices: InvoiceWithNFT[]): Promise<InvoiceAmqpDto[]> {
    const tradeReceivableDtos: InvoiceAmqpDto[] = [];
    for (const invoice of invoices) {
      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(
        invoice.tradeReceivable.id
      );

      tradeReceivableDtos.push(InvoiceAmqpDto.fromPrismaEntity(invoice, trStates));
    }
    return tradeReceivableDtos;
  }
}
