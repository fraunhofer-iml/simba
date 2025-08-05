/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderAmqpDto } from '@ap3/amqp';
import { CurrenciesEnum, ServiceStatesEnum } from '@ap3/util';
import { ApiProperty } from '@nestjs/swagger';
import { InvoiceDto } from '../invoice';
import { OfferDto } from '../offer';
import { ProductDto } from '../product';

export class OrderOverviewDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: String,
    description: 'Number of order, buyerOrderRefDocumentId in Order-X-Standard',
  })
  number: string;
  @ApiProperty({
    type: String,
    description: 'Name of ordered product',
  })
  product: string;
  @ApiProperty({
    type: Number,
    description: 'Amount of ordered products',
  })
  amount: number;
  @ApiProperty({
    type: String,
    description: 'Planned calendar week for production',
  })
  calendarWeek: number;
  @ApiProperty({
    type: String,
    description: 'Planned year for production',
  })
  year: number;
  @ApiProperty({
    type: String,
    enum: ServiceStatesEnum,
  })
  status: string;
  @ApiProperty({
    type: String,
    example: '2025-04-05T14:30:00Z',
    description: 'Timestamp in ISO 8601 format',
  })
  statusTimestamp: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  robots: string[];
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  customerName: string;
  @ApiProperty()
  contractorId: string;
  @ApiProperty()
  contractorName: string;
  @ApiProperty({
    type: String,
    enum: CurrenciesEnum,
  })
  currency: string;
  @ApiProperty()
  invoiceNumber: string;

  constructor(
    id: string,
    number: string,
    product: string,
    amount: number,
    calendarWeek: number,
    year: number,
    status: string,
    statusTimestamp: string,
    price: number,
    robots: string[],
    customerId: string,
    customerName: string,
    contractorId: string,
    contractorName: string,
    currency: string,
    invoiceNumber: string
  ) {
    this.id = id;
    this.number = number;
    this.product = product;
    this.amount = amount;
    this.calendarWeek = calendarWeek;
    this.year = year;
    this.status = status;
    this.statusTimestamp = statusTimestamp;
    this.price = price;
    this.robots = robots;
    this.customerId = customerId;
    this.customerName = customerName;
    this.contractorId = contractorId;
    this.contractorName = contractorName;
    this.currency = currency;
    this.invoiceNumber = invoiceNumber;
  }

  public static toOrderOverviewDto(
    entity: OrderAmqpDto,
    productDto: ProductDto,
    offerDto: OfferDto,
    customerName: string,
    invoice?: InvoiceDto
  ): OrderOverviewDto {
    return new OrderOverviewDto(
      entity.id,
      entity.number,
      productDto.name,
      entity.quantity,
      offerDto ? offerDto.plannedCalendarWeek : 0,
      offerDto ? offerDto.plannedYear : 0,
      entity.status.status,
      entity.status.timestamp,
      offerDto ? offerDto.basicPrice + offerDto.utilization + offerDto.timeUntilProduction : 0,
      entity.robots ? entity.robots : [],
      entity.customerId,
      customerName,
      entity.contractorId,
      entity.contractorName,
      entity.currency,
      invoice?.invoiceNumber ? invoice.invoiceNumber : ''
    );
  }
}
