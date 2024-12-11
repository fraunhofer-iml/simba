import { AuthRolesEnum, InvoiceDto } from '@ap3/api';
import { PaymentStatesEnum } from '@ap3/database';
import { Roles } from 'nest-keycloak-connect';
import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
@ApiTags('Invoices')
@ApiBearerAuth()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get(':id')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get invoice by id.' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the corresponding invoices.',
    required: true,
  })
  @ApiResponse({ type: InvoiceDto })
  async findOne(@Request() req: any, @Param('id') id: string): Promise<InvoiceDto> {
    return await this.invoicesService.findOne(req.user.company, id);
  }

  @Get()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get all invoices corresponding to an order. ' })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the corresponding invoices of a specific order.',
    required: false,
  })
  @ApiResponse({ type: [InvoiceDto] })
  async findAllByOrderId(@Query('orderId') orderId: string): Promise<InvoiceDto[]> {
    return await this.invoicesService.findAllByOrderId(orderId);
  }

  @Get('/states/financial')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get all invoices corresponding to a creditor and a specific financial state ' })
  @ApiQuery({
    name: 'financialState',
    type: String,
    enum: PaymentStatesEnum,
    description: 'Identifying string; Required to identify the corresponding invoices of a specific payment state.',
    required: false,
  })
  @ApiResponse({ type: [InvoiceDto] })
  async findAllByPaymentState(@Request() req: any, @Query('financialState') paymentState: string): Promise<InvoiceDto[]> {
    return await this.invoicesService.findAllByPaymentState(req.user.company, paymentState);
  }
}
