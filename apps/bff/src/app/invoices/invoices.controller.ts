/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaidStatisticsAmqpDto } from '@ap3/amqp';
import { AuthRolesEnum, InvoiceDto, InvoiceIdAndPaymentStateDto, UnpaidStatisticsDto } from '@ap3/api';
import { FinancialRoles, PaymentStates, UserRoles } from '@ap3/util';
import { Roles } from 'nest-keycloak-connect';
import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    name: 'dueDateFrom',
    type: Date,
    description: 'Necessary to filter for the start of a specific due date range. The date of the event has to be in ISO format (YYYY-MM-DDTHH:MM:SSZ)',
    required: false,
    example: '2024-09-20T07:55:55.695Z'
  })
  @ApiQuery({
    name: 'dueDateTo',
    type: Date,
    description: 'Necessary to filter for the end of a specific due date range. The date of the event has to be in ISO format (YYYY-MM-DDTHH:MM:SSZ)',
    required: false,
    example: '2024-09-20T07:55:55.695Z'
  })
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
    name: 'paymentStates',
    type: String,
    enum: PaymentStates,
    description: 'Necessary to filter for a specific payment status. This query parameter can be used multiple times in the same request to select multiple PaymentStates',
    required: false,
    example: PaymentStates.OPEN
  })
  @ApiQuery({
    name: 'invoiceNumber',
    type: String,
    description: 'Necessary to filter for a specific invoice number.',
    required: false,
  })
  @ApiResponse({ type: [InvoiceDto] })
  async findAll(
    @Request() req,
    @Query('dueDateFrom') dueDateFrom: Date,
    @Query('dueDateTo') dueDateTo: Date,
    @Query('creditorId') creditorId: string = '',
    @Query('debtorId') debtorId: string = '',
    @Query('paymentStates') paymentStates: PaymentStates[] = [],
    @Query('invoiceNumber') invoiceNumber: string = ''
  ): Promise<InvoiceDto[]> {
    if (!req.user.realm_access.roles.includes(UserRoles.ADMIN)) {
      if (!creditorId && !debtorId) {
        creditorId = debtorId = req.user.company;
      } else {
        creditorId = creditorId ? req.user.company : '';
        debtorId = debtorId ? req.user.company : '';
      }
    }
    return await this.invoicesService.findAllWithFilter(
      Array.isArray(paymentStates) ? paymentStates : [paymentStates],
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
