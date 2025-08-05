/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import { AllOrdersFilterAmqpDto, AmqpBrokerQueues, CreateOrderAmqpDto, OrderAmqpDto, OrderMessagePatterns } from '@ap3/amqp';
import {
  CompanyDto,
  CreateOrderDto,
  GetMachineAssignmentDto,
  InvoiceDto,
  OfferDto,
  OrderDetailsDto,
  OrderOverviewDto,
  ProductDto,
  ServiceProcessStatusDto,
} from '@ap3/api';
import { ConfigurationService } from '@ap3/config';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CompaniesService } from '../companies/companies.service';
import { InvoicesService } from '../invoices/invoices.service';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';
import { ServiceProcessService } from '../service-process/service-process.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  private readonly operator = this.configuration.getGeneralConfig().platformOperator;
  private readonly currency = this.configuration.getGeneralConfig().platformCurrency;

  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy,
    private readonly offerService: OffersService,
    private readonly productService: ProductsService,
    private readonly configuration: ConfigurationService,
    private readonly companiesService: CompaniesService,
    private readonly serviceProcessService: ServiceProcessService,
    private readonly invoiceService: InvoicesService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderOverviewDto> {
    try {
      this.logger.verbose(`Create new order with dto: ${util.inspect(createOrderDto)}`);
      const createOrder: CreateOrderAmqpDto = createOrderDto.toAMQPDto(this.operator, this.currency);
      const receivedOrder: OrderAmqpDto = await firstValueFrom<OrderAmqpDto>(
        this.processAMQPClient.send(OrderMessagePatterns.CREATE, createOrder)
      );
      return (await this.loadOrderReferences([receivedOrder]))[0];
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findAll(filterAttributes: AllOrdersFilterAmqpDto): Promise<OrderOverviewDto[]> {
    let frontendDtos: OrderOverviewDto[] = [];
    let orders: OrderAmqpDto[] = [];
    try {
      this.logger.verbose(`Get all orders for company with filter attributes: ${util.inspect(filterAttributes)}`);
      orders = await firstValueFrom<OrderAmqpDto[]>(this.processAMQPClient.send(OrderMessagePatterns.READ_ALL, filterAttributes));
      frontendDtos = await this.loadOrderReferences(orders);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }

    return frontendDtos;
  }

  async findOne(id: string): Promise<OrderOverviewDto> {
    let order: OrderAmqpDto;
    try {
      order = await firstValueFrom<OrderAmqpDto>(this.processAMQPClient.send(OrderMessagePatterns.READ_BY_ID, id));
      return (await this.loadOrderReferences([order]))[0];
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findOneDetails(id: string): Promise<OrderDetailsDto> {
    let orderOverviewDto: OrderOverviewDto;
    try {
      orderOverviewDto = await this.findOne(id);
      return this.loadOrderProcessDetails(orderOverviewDto);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await lastValueFrom<boolean>(this.processAMQPClient.send(OrderMessagePatterns.REMOVE_ORDER_BY_ID, id));
    } catch (e) {
      this.logger.log(util.inspect(e));
      throw e;
    }
  }

  private async loadOrderReferences(orders: OrderAmqpDto[]): Promise<OrderOverviewDto[]> {
    const products: Map<string, ProductDto> = new Map();
    const companies: Map<string, CompanyDto> = new Map();
    const invoices: Map<string, InvoiceDto> = await this.loadInvoicesForOrders(orders);
    const retVal: OrderOverviewDto[] = [];
    for (const order of orders) {
      if (!companies.has(order.customerId)) {
        companies.set(order.customerId, await this.companiesService.findOne(order.customerId));
      }
      if (!products.has(order.productId)) {
        products.set(order.productId, await this.productService.loadProductRefs(order));
      }
      const offerRef = await this.offerService.loadAcceptedOfferRef(order);

      retVal.push(
        OrderOverviewDto.toOrderOverviewDto(
          order,
          products.get(order.productId),
          offerRef,
          companies.get(order.customerId).name,
          invoices.has(order.number) ? invoices.get(order.number) : null
        )
      );
    }
    return retVal;
  }

  private async loadInvoicesForOrders(orders: OrderAmqpDto[]): Promise<Map<string, InvoiceDto>> {
    const invoices: Map<string, InvoiceDto> = new Map();
    const invoiceDtos: InvoiceDto[] = await this.invoiceService.findAllWithFilter(orders.map((order) => order.number));
    if (invoiceDtos?.length > 0) {
      invoiceDtos.forEach((invoice) => invoices.set(invoice.orderNumber, invoice));
    }
    return invoices;
  }

  private async loadOrderProcessDetails(order: OrderOverviewDto): Promise<OrderDetailsDto> {
    const machineAssignments: GetMachineAssignmentDto[] = await this.serviceProcessService.getMachineAssignments(order.id);
    const serviceProcessStatus: ServiceProcessStatusDto[] = await this.serviceProcessService.getServiceStates(order.id);
    const relatedOrder: OrderAmqpDto = await firstValueFrom<OrderAmqpDto>(
      this.processAMQPClient.send(OrderMessagePatterns.READ_BY_ID, order.id)
    );
    let acceptedOffer: OfferDto;
    if (relatedOrder.acceptedOfferId) {
      acceptedOffer = await this.offerService.findOneAndParse(relatedOrder.acceptedOfferId);
    }
    return new OrderDetailsDto(order, serviceProcessStatus, machineAssignments, acceptedOffer);
  }
}
