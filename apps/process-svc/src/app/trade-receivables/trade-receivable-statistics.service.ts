import util from 'node:util';
import { NotPaidTrStatisticsAmqpDto, PaidTrStatisticsAmqpDto } from '@ap3/amqp';
import { MonthsEnum } from '@ap3/config';
import {
  InvoiceCountAndDueMonth,
  InvoiceIdTypes,
  InvoicePrismaService,
  InvoiceSumTotalAmountWithoutVatTypes,
  PaymentStatesEnum,
  TradeReceivablePaymentStatusCount,
  TradeReceivablePrismaService,
} from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TradeReceivablesStatisticsService {
  private readonly logger = new Logger(TradeReceivablesStatisticsService.name);
  constructor(
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly invoicePrismaService: InvoicePrismaService
  ) {}

  async calcPaidTradeReceivableVolumePerMonth(year: number, creditorId: string): Promise<PaidTrStatisticsAmqpDto[]> {
    const volumeOfPaidTradeReceivablesPerMonth: PaidTrStatisticsAmqpDto[] = [];
    const paidInvoiceIdsPerMonth: Map<string, string[]> = await this.getInvoiceIdsForPaidTradeReceivablesPerMonth(year, creditorId);
    const dueInvoicesCountPerMonth: Map<string, number> = await this.getCountOfInvoicesDuePerMonth(year, creditorId);
    const paidOnTimeInvoicesCountPerMonth: Map<string, number> = await this.getCountOfPaidOnTimeInvoicesPerMonth(year, creditorId);

    for (const key of paidInvoiceIdsPerMonth.keys()) {
      let totalAmount = 0;
      if (paidInvoiceIdsPerMonth.has(key) && paidInvoiceIdsPerMonth.get(key).length > 0) {
        const totalAmountOfPaidTRs: InvoiceSumTotalAmountWithoutVatTypes =
          await this.invoicePrismaService.sumInvoiceAmountsForTradeReceivables(paidInvoiceIdsPerMonth.get(key), creditorId);
        totalAmount = +totalAmountOfPaidTRs._sum.totalAmountWithoutVat;
      }

      let percentageOfPaidOnTimeTRs = 0;
      if (dueInvoicesCountPerMonth.has(key) && dueInvoicesCountPerMonth.get(key) != 0 && paidOnTimeInvoicesCountPerMonth.has(key)) {
        percentageOfPaidOnTimeTRs = Number(paidOnTimeInvoicesCountPerMonth.get(key)) / Number(dueInvoicesCountPerMonth.get(key));
      }

      volumeOfPaidTradeReceivablesPerMonth.push(new PaidTrStatisticsAmqpDto(key, totalAmount, percentageOfPaidOnTimeTRs));
    }
    return volumeOfPaidTradeReceivablesPerMonth;
  }

  async getTradeReceivablesNotPaidStatisticsByCompanyId(companyId: string): Promise<NotPaidTrStatisticsAmqpDto> {
    let overdue = 0;
    let overdueValue = 0;
    let outstanding = 0;
    let outstandingValue = 0;

    const tradeReceivablePaymentStatesCount: TradeReceivablePaymentStatusCount[] =
      await this.tradeReceivablePrismaService.getTradeReceivableStateStatistics(companyId);
    for (const trPaymentStateCount of tradeReceivablePaymentStatesCount) {
      if (trPaymentStateCount.status == PaymentStatesEnum.OPEN) {
        outstanding = Number(trPaymentStateCount.count);
        outstandingValue = Number(trPaymentStateCount.total_value);
      } else if (trPaymentStateCount.status == PaymentStatesEnum.EXCEEDED) {
        overdue = Number(trPaymentStateCount.count);
        overdueValue = Number(trPaymentStateCount.total_value);
      }
    }

    return new NotPaidTrStatisticsAmqpDto(overdue, overdueValue, outstanding, outstandingValue);
  }

  private async getInvoiceIdsForPaidTradeReceivablesPerMonth(year: number, creditorId: string): Promise<Map<string, string[]>> {
    const paidInvoiceIdsPerMonth: Map<string, string[]> = new Map();
    for (const month in MonthsEnum) {
      const monthIndex = MonthsEnum[month as keyof typeof MonthsEnum];
      const invoiceIds: InvoiceIdTypes[] = await this.tradeReceivablePrismaService.getInvoiceIdsForPaidTradeReceivableIdsForMonth(
        monthIndex,
        year,
        creditorId
      );
      const invoiceIdsAsString: string[] = [];

      invoiceIds.forEach((ivId) => {
        invoiceIdsAsString.push(ivId.id);
      });

      const dueMonthSQL = `${year}-${monthIndex}`;
      paidInvoiceIdsPerMonth.set(dueMonthSQL, invoiceIdsAsString);
    }
    return paidInvoiceIdsPerMonth;
  }

  private async getCountOfInvoicesDuePerMonth(year: number, creditorId: string): Promise<Map<string, number>> {
    const dueInvoicesPerMonth: Map<string, number> = new Map();
    const dueInvoicesForMonth: InvoiceCountAndDueMonth[] = await this.invoicePrismaService.countInvoicesDueInMonth(year, creditorId);

    this.logger.debug(util.inspect(dueInvoicesForMonth));
    if (dueInvoicesForMonth && dueInvoicesForMonth.length > 0) {
      for (const invoiceCount of dueInvoicesForMonth) {
        dueInvoicesPerMonth.set(invoiceCount.due_month, invoiceCount.invoice_count);
        this.logger.debug(util.inspect(dueInvoicesPerMonth));
      }
    }
    return dueInvoicesPerMonth;
  }

  private async getCountOfPaidOnTimeInvoicesPerMonth(year: number, creditorId: string): Promise<Map<string, number>> {
    const countPaidOnTimeInvoicesPerMonth: Map<string, number> = new Map();

    const paidOnTimeInvoicesPerMonth: InvoiceCountAndDueMonth[] = await this.tradeReceivablePrismaService.countPaidOnTimeInvoicesMonthly(
      year,
      creditorId
    );

    this.logger.debug(util.inspect(paidOnTimeInvoicesPerMonth));
    if (paidOnTimeInvoicesPerMonth && paidOnTimeInvoicesPerMonth.length > 0) {
      for (const paidInvoiceCount of paidOnTimeInvoicesPerMonth) {
        countPaidOnTimeInvoicesPerMonth.set(paidInvoiceCount.due_month, paidInvoiceCount.invoice_count);
        this.logger.debug(util.inspect(countPaidOnTimeInvoicesPerMonth));
      }
    }
    return countPaidOnTimeInvoicesPerMonth;
  }
}
