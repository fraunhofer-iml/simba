import util from 'node:util';
import { AllInvoicesFilter, CompanyIdAndInvoiceId, CompanyIdAndPaymentState, InvoiceAmqpDto } from '@ap3/amqp';
import { ConfigurationService } from '@ap3/config';
import { InvoiceForZugferd, InvoicePrismaAdapterService, InvoiceWithNFT, TradeReceivablePrismaService } from '@ap3/database';
import { S3Service } from '@ap3/s3';
import { Injectable, Logger } from '@nestjs/common';
import { Invoice, PaymentStatus, TradeReceivable } from '@prisma/client';
import { InvoicesZugferdService } from './zugferd/invoices-zugferd.service';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  constructor(
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly invoicePrismaService: InvoicePrismaAdapterService,
    private readonly invoiceZugferdService: InvoicesZugferdService,
    private readonly config: ConfigurationService,
    private readonly s3Service: S3Service
  ) {}

  async findAll(filterParams: AllInvoicesFilter): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables for ${util.inspect(filterParams)}`);
    try {
      const possibleInvoiceIds: string[] = [];
      if (filterParams.paymentState) {
        const tradeReceivables: TradeReceivable[] = await this.tradeReceivablePrismaService.getTradeReceivableByPaymentStatus(
          filterParams.paymentState,
          filterParams.creditorId,
          filterParams.debtorId
        );
        if (!tradeReceivables || tradeReceivables.length == 0) {
          this.logger.verbose(`No invoices found for payment state ${filterParams.paymentState}`);
          return [];
        }
        for (const tr of tradeReceivables) {
          possibleInvoiceIds.push(tr.invoiceId);
        }
      }
      const invoices: InvoiceWithNFT[] = await this.invoicePrismaService.getInvoicesCorrespondingToFilterParams(
        filterParams,
        possibleInvoiceIds
      );
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

  async findOne(params: CompanyIdAndInvoiceId): Promise<InvoiceAmqpDto> {
    const invoice: InvoiceWithNFT = await this.invoicePrismaService.getInvoiceById(params.invoiceId, params.companyId);

    return (await this.loadAssociatedDataAndConvertToDTO([invoice]))[0];
  }

  async findInvoiceByPaymentStateAndCreditorId(params: CompanyIdAndPaymentState): Promise<InvoiceAmqpDto[]> {
    this.logger.verbose(`requesting all trade receivables with payment state #${params.paymentState}`);
    return this.loadTRAssociatedDataAndConvertToDTO(
      await this.tradeReceivablePrismaService.getTradeReceivableByPaymentStatus(params.paymentState, params.companyId, ''),
      params.companyId
    );
  }

  async createAndUploadZugferdPDF(params: CompanyIdAndInvoiceId) {
    const invoice: InvoiceForZugferd = await this.invoicePrismaService.getInvoiceByIdForZugferd(params.invoiceId, params.companyId);
    const pdfFile: Uint8Array = await this.invoiceZugferdService.generatePdf(invoice);

    const fileName = `${this.config.getMinioConfig().invoicePrefix}${invoice.invoiceNumber}.pdf`;
    await this.s3Service.uploadPdf(Buffer.from(pdfFile.buffer), fileName);

    await this.invoicePrismaService.updateInvoiceURL(params.invoiceId, fileName);
    return fileName;
  }

  private async loadTRAssociatedDataAndConvertToDTO(tradeReceivables: TradeReceivable[], companyId: string): Promise<InvoiceAmqpDto[]> {
    const tradeReceivableDtos: InvoiceAmqpDto[] = [];
    for (const tr of tradeReceivables) {
      const relatedInvoice: Invoice = await this.invoicePrismaService.getInvoiceById(tr.invoiceId, companyId);

      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tr.id);
      tradeReceivableDtos.push(
        InvoiceAmqpDto.fromTRPrismaEntity(tr, relatedInvoice, trStates, this.config.getMinioConfig().objectStorageURL)
      );
    }
    return tradeReceivableDtos;
  }

  private async loadAssociatedDataAndConvertToDTO(invoices: InvoiceWithNFT[]): Promise<InvoiceAmqpDto[]> {
    const tradeReceivableDtos: InvoiceAmqpDto[] = [];

    for (const invoice of invoices) {
      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(
        invoice.tradeReceivable.id
      );

      tradeReceivableDtos.push(InvoiceAmqpDto.fromPrismaEntity(invoice, trStates, this.config.getMinioConfig().objectStorageURL));
    }
    return tradeReceivableDtos;
  }
}
