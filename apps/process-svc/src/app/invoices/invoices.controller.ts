import { CompanyIdAndInvoiceId, CompanyIdAndPaymentState, InvoiceAmqpDto, InvoiceMessagePatterns } from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvoicesService } from './invoices.service';

@Controller()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @MessagePattern(InvoiceMessagePatterns.READ_ALL)
  async findAll(): Promise<InvoiceAmqpDto[]> {
    return await this.invoicesService.findAll();
  }

  @MessagePattern(InvoiceMessagePatterns.READ_BY_ID)
  async findOneById(@Payload() params: CompanyIdAndInvoiceId): Promise<InvoiceAmqpDto> {
    return await this.invoicesService.findOne(params);
  }

  @MessagePattern(InvoiceMessagePatterns.READ_BY_DEBTOR_ID)
  async findAllByDebtorId(@Payload() userId: string): Promise<InvoiceAmqpDto[]> {
    return await this.invoicesService.findByDebtor(userId);
  }

  @MessagePattern(InvoiceMessagePatterns.READ_BY_CREDITOR_ID)
  async findAllByCreditorId(@Payload() userId: string): Promise<InvoiceAmqpDto[]> {
    return await this.invoicesService.findByCreditor(userId);
  }

  @MessagePattern(InvoiceMessagePatterns.READ_BY_ORDER_ID)
  async findAllByOrderId(@Payload() orderId: string): Promise<InvoiceAmqpDto[]> {
    return await this.invoicesService.findByOrder(orderId);
  }

  @MessagePattern(InvoiceMessagePatterns.READ_ALL_BY_PAYMENT_STATE)
  async findAllByPaymentStateAndCreditorId(@Payload() params: CompanyIdAndPaymentState): Promise<InvoiceAmqpDto[]> {
    return await this.invoicesService.findInvoiceByPaymentStateAndCreditorId(params);
  }
}
