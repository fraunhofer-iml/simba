/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { DatabaseUtil, OrderOverview } from '@ap3/database';
import { ServiceStatus } from '@prisma/client';
import { ServiceStatusAmqpDto } from './service-status-amqp.dto';

export class OrderAmqpDto {
  id: string;
  number: string;
  productId: string;
  quantity: number;
  requestedYear: number;
  requestedCalendarWeek: number;
  creationDate: string;
  status: ServiceStatusAmqpDto;
  acceptedOfferId?: string;
  offerIds: string[];
  robots: string[];
  customerId: string;
  tradeReceivableIds: string[];
  currency: string;

  constructor(
    id: string,
    number: string,
    productId: string,
    amount: number,
    year: number,
    calendarWeek: number,
    creationDate: string,
    status: ServiceStatusAmqpDto,
    customerId: string,
    currency: string,
    tradeReceivableIds: string[] = [],
    offerIds: string[] = [],
    robots: string[] = [],
    acceptedOfferId?: string
  ) {
    this.id = id;
    this.number = number;
    this.productId = productId;
    this.quantity = amount;
    this.requestedYear = year;
    this.requestedCalendarWeek = calendarWeek;
    this.creationDate = creationDate;
    this.status = status;
    this.customerId = customerId;
    this.currency = currency;
    this.tradeReceivableIds = tradeReceivableIds;
    this.offerIds = offerIds;
    this.robots = robots;
    this.acceptedOfferId = acceptedOfferId;
  }

  public static fromPrismaEntity(order: OrderOverview, currentState: ServiceStatusAmqpDto): OrderAmqpDto {
    const tradeReceivableIds: string[] | undefined = order.serviceProcess?.invoices
      ?.map((invoice) => invoice.tradeReceivable?.id)
      ?.filter((id): id is string => id !== undefined);

    return new OrderAmqpDto(
      order.id,
      order.buyerOrderRefDocumentId ? order.buyerOrderRefDocumentId : '',
      order.orderLines[0].item.id,
      order.orderLines[0].requestedQuantity.toNumber(),
      order.serviceProcess?.dueYear ? order.serviceProcess.dueYear : 0,
      order.serviceProcess?.dueCalendarWeek ? order.serviceProcess.dueCalendarWeek : 0,
      order.documentIssueDate.toISOString(),
      currentState,
      order.buyer.id,
      order.vatCurrency,
      tradeReceivableIds ? tradeReceivableIds : [],
      order.serviceProcess?.offers.map((offer) => offer.id),
      DatabaseUtil.ExtractMachineIdsFromServiceProcess(order.serviceProcess),
      order.serviceProcess?.acceptedOffer?.id
    );
  }

  public static getLatestState(states: ServiceStatus[] | undefined): ServiceStatusAmqpDto | null {
    let retVal: ServiceStatusAmqpDto | null = null;
    if (states && states.length > 0) {
      const serviceStatePrisma: ServiceStatus = states.reduce((latest, current) => {
        return current.timestamp > latest.timestamp ? current : latest;
      });
      retVal = new ServiceStatusAmqpDto(serviceStatePrisma.status, new Date(serviceStatePrisma.timestamp).toISOString());
    }
    return retVal;
  }
}
