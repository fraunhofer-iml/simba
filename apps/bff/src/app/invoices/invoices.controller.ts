import { AuthRolesEnum, InvoiceDto } from '@ap3/api';
import { PaymentStatesEnum } from '@ap3/database';
import { Roles } from 'nest-keycloak-connect';
import { Controller, Get, Param, Query, Request } from '@nestjs/common';
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
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the corresponding invoices.',
    required: true,
  })
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string): Promise<InvoiceDto> {
    return await this.invoicesService.findOne(req.user.company, id);
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
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @Get()
  async findAllByOrderId(@Query('orderId') orderId: string): Promise<InvoiceDto[]> {
    return await this.invoicesService.findAllByOrderId(orderId);
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
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @Get('/states/financial')
  async findAllByPaymentState(@Request() req: any, @Query('financialState') paymentState: string): Promise<InvoiceDto[]> {
    return await this.invoicesService.findAllByPaymentState(req.user.company, paymentState);
  }
}
