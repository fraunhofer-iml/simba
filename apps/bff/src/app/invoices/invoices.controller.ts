import { InvoiceDto } from '@ap3/api';
import { PaymentStatesEnum } from '@ap3/database';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
@ApiTags('Invoices')
@ApiBearerAuth()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @ApiOperation({
    description: 'Get invoice by id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the corresponding invoices.',
    required: true,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InvoiceDto> {
    return await this.invoicesService.findOne(id);
  }

  @ApiOperation({
    description: 'Get all invoices corresponding to an order. ',
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the corresponding invoices of a specific order.',
    required: false,
  })
  @Get()
  async findAll(@Query('orderId') orderId: string): Promise<InvoiceDto[]> {
    return await this.invoicesService.findAll(orderId);
  }

  @ApiOperation({
    description: 'Get all invoices corresponding to a creditor and a specific financial state ',
  })
  @ApiQuery({
    name: 'financialState',
    type: String,
    enum: PaymentStatesEnum,
    description: 'Identifying string; Required to identify the corresponding invoices of a specific payment state.',
    required: false,
  })
  @Get('/states/financial')
  async findAllByPaymentState(@Query('financialState') paymentState: string): Promise<InvoiceDto[]> {
    return await this.invoicesService.findAllByPaymentState(paymentState);
  }
}
