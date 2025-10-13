/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import { ServiceStatesEnum } from '@ap3/util';
import { Injectable, Logger } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { ordersWithDependenciesSelect } from './orders-with-dependencies.prisma-select';
import { OrderWithDependencies } from './types';

@Injectable()
export class OrderPrismaService {
  private logger = new Logger(OrderPrismaService.name);
  constructor(private prisma: PrismaService) {}

  async getOrdersWithDependencies({
    orderIds,
    buyerId,
    sellerId,
    machineOwnerId,
    serviceStates,
    buyerName,
    productionDateFrom,
    productionDateTo,
  }: {
    orderIds?: string[];
    buyerId?: string;
    sellerId?: string;
    machineOwnerId?: string;
    serviceStates?: ServiceStatesEnum[];
    buyerName?: string;
    productionDateFrom?: Date;
    productionDateTo?: Date;
  }): Promise<OrderWithDependencies[] | null> {
    try {
      const filters: Prisma.OrderWhereInput[][] = this.createCompaniesFilter(buyerId, sellerId, machineOwnerId);
      const orFilters: Prisma.OrderWhereInput[] = filters[0];
      const andFilters: Prisma.OrderWhereInput[] = filters[1];
      andFilters.push(...this.createOrderAndFilter(orderIds, serviceStates, buyerName, productionDateFrom, productionDateTo));

      const whereClause: Prisma.OrderWhereInput = {
        ...(orFilters.length ? { OR: orFilters } : {}),
        ...(andFilters.length ? { AND: andFilters } : {}),
      };

      return this.getOrders(whereClause);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    this.logger.debug('Insert new order via prisma');
    try {
      return this.prisma.order.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async deleteOrder(id: string): Promise<Order> {
    try {
      return this.prisma.order.delete({
        where: { id: String(id) },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  private async getOrders(whereClause: Prisma.OrderWhereInput): Promise<OrderWithDependencies[] | null> {
    return this.prisma.order.findMany({
      where: whereClause,
      select: ordersWithDependenciesSelect,
    });
  }

  private createOrderAndFilter(
    orderIds?: string[],
    serviceStates?: ServiceStatesEnum[],
    buyerName?: string,
    productionDateFrom?: Date,
    productionDateTo?: Date
  ): Prisma.OrderWhereInput[] {
    const orderIdFilter: Prisma.OrderWhereInput | undefined = orderIds && orderIds.length > 0 ? { id: { in: orderIds } } : undefined;
    const stateFilter: Prisma.OrderWhereInput | undefined =
      serviceStates && serviceStates.length > 0 ? { serviceProcess: { states: { some: { status: { in: serviceStates } } } } } : undefined;
    const buyerNameFilter: Prisma.OrderWhereInput | undefined = buyerName ? { buyer: { name: buyerName } } : undefined;
    const productionDateFromFilter: Prisma.OrderWhereInput | undefined = productionDateFrom
      ? { serviceProcess: { scheduledDate: { gt: productionDateFrom } } }
      : undefined;
    const productionDateToFilter: Prisma.OrderWhereInput | undefined = productionDateTo
      ? { serviceProcess: { scheduledDate: { lt: productionDateTo } } }
      : undefined;

    return <Prisma.OrderWhereInput[]>(
      [orderIdFilter, stateFilter, buyerNameFilter, productionDateFromFilter, productionDateToFilter].filter(
        (filter) => filter !== undefined
      )
    );
  }

  /**
   * Returns array of "or"-Filters, if id matches between company roles (buyer, seller and machine owner).
   * Alternatively returns an empty array if only one company role id is set or all ids are different.
   * @return OrderWhereInput[orFilter[],andFilter[]] array with 2 entries:
   * first entry is an array of orFilters and the second array is an array of andFilters.
   */
  private createCompaniesFilter(buyerId?: string, sellerId?: string, machineOwnerId?: string): Prisma.OrderWhereInput[][] {
    let orFilters: Prisma.OrderWhereInput[] = [];
    const andFilters: Prisma.OrderWhereInput[] = [];
    const buyerFilter: Prisma.OrderWhereInput | undefined = buyerId ? { buyerId: String(buyerId) } : undefined;
    const sellerFilter: Prisma.OrderWhereInput | undefined = sellerId ? { sellerId: String(sellerId) } : undefined;
    const machineOwnerFilter: Prisma.OrderWhereInput | undefined = machineOwnerId
      ? { serviceProcess: { machineAssignments: { some: { machine: { companyId: String(machineOwnerId) } } } } }
      : undefined;

    if (buyerFilter && sellerFilter && machineOwnerFilter && buyerId === sellerId && buyerId == machineOwnerId) {
      orFilters = [buyerFilter, sellerFilter, machineOwnerFilter];
    } else if (buyerFilter && sellerFilter && buyerId === sellerId) {
      orFilters = [buyerFilter, sellerFilter];
      if (machineOwnerFilter) andFilters.push(machineOwnerFilter);
    } else if (buyerFilter && machineOwnerFilter && buyerId === machineOwnerId) {
      orFilters = [buyerFilter, machineOwnerFilter];
      if (sellerFilter) andFilters.push(sellerFilter);
    } else if (sellerFilter && machineOwnerFilter && sellerId === machineOwnerId) {
      orFilters = [sellerFilter, machineOwnerFilter];
      if (buyerFilter) andFilters.push(buyerFilter);
    } else {
      if (machineOwnerFilter) andFilters.push(machineOwnerFilter);
      if (sellerFilter) andFilters.push(sellerFilter);
      if (buyerFilter) andFilters.push(buyerFilter);
    }
    return [orFilters, andFilters];
  }
}
