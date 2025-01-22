import { PaidStatisticsAmqpDto } from '@ap3/amqp';
import { AuthRolesEnum, FinancialRoles, InvoiceDto, RolesEnum, UnpaidStatisticsDto } from '@ap3/api';
import { PaymentStatesEnum } from '@ap3/database';
import { Roles } from 'nest-keycloak-connect';
import { Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
@ApiTags('Invoices')
@ApiBearerAuth()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get all invoices.' })
  @ApiQuery({
    name: 'creditorId',
    type: String,
    description: 'Company id; Required to identify the corresponding creditor.',
    required: false,
  })
  @ApiQuery({
    name: 'debtorId',
    type: String,
    description: 'Company id; Required to identify the corresponding debtor.',
    required: false,
  })
  @ApiQuery({
    name: 'paymentState',
    type: String,
    enum: PaymentStatesEnum,
    description: 'Necessary to filter for a specific payment status.',
    required: false,
  })
  @ApiResponse({ type: [InvoiceDto] })
  async findAll(
    @Request() req,
    @Query('creditorId') creditorId = '',
    @Query('debtorId') debtorId = '',
    @Query('paymentState') paymentState = ''
  ): Promise<InvoiceDto[]> {
    if (!req.user.realm_access.roles.includes(RolesEnum.ADMIN)) {
      if (!creditorId && !debtorId) {
        creditorId = debtorId = req.user.company;
      } else {
        creditorId = creditorId ? req.user.company : '';
        debtorId = debtorId ? req.user.company : '';
      }
    }
    return await this.invoicesService.findAllWithFilter(creditorId, debtorId, paymentState);
  }

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
    const companyId = req.user.realm_access.roles.includes(RolesEnum.ADMIN) ? '' : req.user.company;

    return await this.invoicesService.findOne(companyId, id);
  }

  @Post(':id/zugferd')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Create zugferd pdf from invoice and upload to s3 server ' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the corresponding invoice.',
    required: true,
  })
  @ApiResponse({ type: String, description: 'File name of uploaded zugferd pdf document.' })
  async createAndUploadZugferdPDF(@Request() req: any, @Param('id') id: string): Promise<string> {
    const companyId = req.user.realm_access.roles.includes(RolesEnum.ADMIN) ? '' : req.user.company;

    return await this.invoicesService.createAndUploadZugferdPDF(companyId, id);
  }

  @Get('/statistics/paid')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR, AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Get a statistic for all trade receivables paid in a given year, grouped by month. ' })
  @ApiQuery({
    name: 'year',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'financialRole',
    type: String,
    required: true,
  })
  @ApiResponse({ type: [PaidStatisticsAmqpDto] })
  async getStatisticPaidTradePerMonth(
    @Request() req: any,
    @Query('year') year: number,
    @Query('financialRole') financialRole: FinancialRoles
  ): Promise<PaidStatisticsAmqpDto[]> {
    return await this.invoicesService.getStatisticPaidPerMonth(req.user.company, year, financialRole);
  }

  @Get('/statistics/unpaid')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR, AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Get trade receivables statistics by companyId.' })
  @ApiQuery({
    name: 'financialRole',
    type: String,
    required: true,
  })
  @ApiResponse({ type: UnpaidStatisticsDto })
  async getStatisticUnpaid(@Request() req: any, @Query('financialRole') financialRole: FinancialRoles): Promise<UnpaidStatisticsDto> {
    return await this.invoicesService.getStatisticNotPaidPerMonth(req.user.company, financialRole);
  }
}
