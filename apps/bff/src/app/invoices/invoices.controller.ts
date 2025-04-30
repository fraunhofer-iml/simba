/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceAmqpDto, PaidStatisticsAmqpDto } from '@ap3/amqp';
import { AuthRolesEnum, CreateInvoiceDto, InvoiceDto, InvoiceIdAndPaymentStateDto, UnpaidStatisticsDto } from '@ap3/api';
import { FinancialRoles, PaymentStates, UserRoles } from '@ap3/util';
import { Roles } from 'nest-keycloak-connect';
import { Body, Controller, Get, Logger, Param, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
@ApiTags('Invoices')
@ApiBearerAuth()
export class InvoicesController {
  private readonly logger = new Logger(InvoicesController.name);
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Create a new invoice for an order ' })
  @ApiBody({
    type: CreateInvoiceDto,
    required: true,
  })
  async create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<InvoiceAmqpDto> {
    return this.invoicesService.createInvoice(createInvoiceDto);
  }

  @Get()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Get all invoices.' })
  @ApiQuery({
    name: 'dueDateFrom',
    type: Date,
    description:
      'Used to filter for the start of a specific due date range. The date of the event has to be in ISO format (YYYY-MM-DDTHH:MM:SSZ)',
    required: false,
    example: '2024-09-20T07:55:55.695Z',
  })
  @ApiQuery({
    name: 'dueDateTo',
    type: Date,
    description:
      'Used to filter for the end of a specific due date range. The date of the event has to be in ISO format (YYYY-MM-DDTHH:MM:SSZ)',
    required: false,
    example: '2024-09-20T07:55:55.695Z',
  })
  @ApiQuery({
    name: 'creditorId',
    type: String,
    description: 'Company id; Used to identify the corresponding creditor.',
    required: false,
    example: 'pt0001',
  })
  @ApiQuery({
    name: 'debtorId',
    type: String,
    description: 'Company id; Used to identify the corresponding debtor.',
    required: false,
    example: 'pt0001',
  })
  @ApiQuery({
    name: 'paymentStates',
    type: [String],
    isArray: true,
    enum: PaymentStates,
    description: ' Payment statuses; Used to filter for specific payment statuses.',
    required: false,
    example: [PaymentStates.OPEN, PaymentStates.PAID],
  })
  @ApiQuery({
    name: 'invoiceNumber',
    type: String,
    description: 'Redundant parameter, will be removed in later releases',
    required: false,
  })
  @ApiResponse({ type: [InvoiceDto] })
  async findAll(
    @Request() req,
    @Query('dueDateFrom') dueDateFrom: Date,
    @Query('dueDateTo') dueDateTo: Date,
    @Query('invoiceNumber') invoiceNumber: string,
    @Query('orderNumber') orderNumber: string,
    @Query('creditorId') creditorId: string = '',
    @Query('debtorId') debtorId: string = '',
    @Query('paymentStates') paymentStates: PaymentStates[] = []
  ): Promise<InvoiceDto[]> {
    if (!req.user.realm_access.roles.includes(UserRoles.ADMIN)) {
      if (!creditorId && !debtorId) {
        creditorId = req.user.company;
        debtorId = req.user.company;
      } else if (req.user.realm_access.roles.includes(UserRoles.CONTRIBUTOR)) {
        creditorId = req.user.company;
      } else if (req.user.realm_access.roles.includes(UserRoles.CUSTOMER)) {
        debtorId = req.user.company;
      }
    }

    return await this.invoicesService.findAllWithFilter(
      orderNumber ? [orderNumber] : [],
      paymentStates,
      creditorId,
      debtorId,
      invoiceNumber,
      dueDateFrom,
      dueDateTo
    );
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
    const companyId = req.user.realm_access.roles.includes(UserRoles.ADMIN) ? '' : req.user.company;
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
    const companyId = req.user.realm_access.roles.includes(UserRoles.ADMIN) ? '' : req.user.company;
    return await this.invoicesService.createAndUploadZugferdPDF(companyId, id);
  }

  @Get('/statistics/paid')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR, AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Get a statistic for all trade receivables paid in a given year, grouped by month. ' })
  @ApiQuery({
    name: 'year',
    type: Number,
    description: 'The year all statistics need to be in',
    example: '2024',
    required: true,
  })
  @ApiQuery({
    name: 'financialRole',
    description: 'The financial role the client takes, either debtor or creditor',
    example: FinancialRoles.CREDITOR,
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'invoiceIds',
    type: String,
    description: 'A string array of InvoiceIds. These need to be transmitted as an exact JSON string.',
    example: '["IV0001", "IV0002"]',
    required: false,
  })
  @ApiResponse({ type: [PaidStatisticsAmqpDto] })
  async getStatisticPaidTradePerMonth(
    @Request() req: any,
    @Query('year') year: number,
    @Query('financialRole') financialRole: FinancialRoles,
    @Query('invoiceIds') invoiceIds?: string
  ): Promise<PaidStatisticsAmqpDto[]> {
    return await this.invoicesService.getStatisticPaidPerMonth(req.user.company, year, financialRole, invoiceIds);
  }

  @Get('/statistics/unpaid')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR, AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Get trade receivables statistics by companyId.' })
  @ApiQuery({
    name: 'financialRole',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'invoiceIds',
    type: String,
    description: 'A string array of InvoiceIds. These need to be transmitted as an exact JSON string.',
    example: '["IV0001", "IV0002"]',
    required: true,
  })
  @ApiResponse({ type: UnpaidStatisticsDto })
  async getStatisticUnpaid(
    @Request() req: any,
    @Query('financialRole') financialRole: FinancialRoles,
    @Query('invoiceIds') invoiceIds?: string
  ): Promise<UnpaidStatisticsDto> {
    return await this.invoicesService.getStatisticNotPaidPerMonth(req.user.company, financialRole, invoiceIds);
  }

  @Post('/payment-status')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Create a new PaymentStatus manually for invoice ' })
  @ApiBody({
    type: [InvoiceIdAndPaymentStateDto],
    required: true,
  })
  async createPaymentStatusForInvoice(@Body() statusChanges: InvoiceIdAndPaymentStateDto[]): Promise<void> {
    await this.invoicesService.createNewPaymentStatusForInvoice(statusChanges);
  }
}
