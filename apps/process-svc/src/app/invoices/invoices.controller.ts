import {
  AllInvoicesFilterAmqpDto,
  CompanyAndFinancialRole,
  CompanyAndInvoiceAmqpDto,
  InvoiceAmqpDto,
  InvoiceIdAndPaymentStateAmqpDto,
  InvoiceMessagePatterns,
  NotPaidStatisticsAmqpDto,
  PaidStatisticsAmqpDto,
  TRParamsCompanyIdAndYearAndFinancialRole,
} from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvoicesService } from './invoices.service';
import { InvoicesStatisticsService } from './statistics/invoices-statistics.service';

@Controller()
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly invoiceStatistics: InvoicesStatisticsService
  ) {}

  @MessagePattern(InvoiceMessagePatterns.READ_ALL)
  async findAll(@Payload() filterParams: AllInvoicesFilterAmqpDto): Promise<InvoiceAmqpDto[]> {
    return await this.invoicesService.findAll(filterParams);
  }

  @MessagePattern(InvoiceMessagePatterns.READ_BY_ID)
  async findOneById(@Payload() params: CompanyAndInvoiceAmqpDto): Promise<InvoiceAmqpDto> {
    return await this.invoicesService.findOne(params);
  }

  @MessagePattern(InvoiceMessagePatterns.CREATE_AND_UPLOAD_ZUGFERD_PDF)
  async createAndUploadZugferdPDF(@Payload() params: CompanyAndInvoiceAmqpDto): Promise<string> {
    return await this.invoicesService.createAndUploadZugferdPDF(params);
  }

  @MessagePattern(InvoiceMessagePatterns.READ_STATISTICS_PAID)
  async calcPaidTradeReceivableVolumePerMonth(
    @Payload() params: TRParamsCompanyIdAndYearAndFinancialRole
  ): Promise<PaidStatisticsAmqpDto[]> {
    return await this.invoiceStatistics.calcPaidInvoicesVolumePerMonth(params.year, params.companyId, params.financialRole);
  }

  @MessagePattern(InvoiceMessagePatterns.READ_STATISTICS_NOT_PAID)
  async getTradeReceivableNotPaidStatistics(@Payload() params: CompanyAndFinancialRole): Promise<NotPaidStatisticsAmqpDto> {
    return await this.invoiceStatistics.getInvoicesNotPaidStatisticsByCompanyId(params.companyId, params.financialRole);
  }

  @MessagePattern(InvoiceMessagePatterns.CREATE_NEW_PAYMENT_STATUS_FOR_INVOICE)
  async createPaymentStateForInvoice(@Payload() statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    return await this.invoicesService.createPaymentStatusForInvoice(statusChanges);
  }
}
