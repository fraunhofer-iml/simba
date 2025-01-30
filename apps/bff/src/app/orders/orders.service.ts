import * as util from 'node:util';
import { AmqpBrokerQueues, CreateOrderAmqpDto, OrderAmqpDto, OrderMessagePatterns } from '@ap3/amqp';
import { CreateOrderDto, GetMachineAssignmentDto, OrderDetailsDto, OrderOverviewDto, ServiceProcessStatusDto } from '@ap3/api';
import { ConfigurationService } from '@ap3/config';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CompaniesService } from '../companies/companies.service';
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
    private readonly serviceProcessService: ServiceProcessService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderOverviewDto> {
    try {
      this.logger.verbose(`Create new order with dto: ${util.inspect(createOrderDto)}`);
      const createOrder: CreateOrderAmqpDto = createOrderDto.toAMQPDto(this.operator, this.currency);
      const receivedOrder: OrderAmqpDto = await firstValueFrom<OrderAmqpDto>(
        this.processAMQPClient.send(OrderMessagePatterns.CREATE, createOrder)
      );
      await this.offerService.createOffer(receivedOrder.id);
      return this.loadOrderReferences(receivedOrder);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findAll(companyId: string): Promise<OrderOverviewDto[]> {
    let frontendDtos: OrderOverviewDto[] = [];
    let orders: OrderAmqpDto[] = [];
    try {
      this.logger.verbose(`Get all orders for company with id: ${companyId}`);
      orders = await firstValueFrom<OrderAmqpDto[]>(this.processAMQPClient.send(OrderMessagePatterns.READ_ALL, companyId));
      frontendDtos = await Promise.all(
        orders.map(async (order) => {
          return await this.loadOrderReferences(order);
        })
      );
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
      return this.loadOrderReferences(order);
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

  private async loadOrderReferences(order: OrderAmqpDto): Promise<OrderOverviewDto> {
    const productRef = await this.productService.loadProductRefs(order);
    const offerRef = await this.offerService.loadOfferRef(order);
    const customer = await this.companiesService.findOne(order.customerId);
    return OrderOverviewDto.toOrderOverviewDto(order, productRef, offerRef, customer.name);
  }

  private async loadOrderProcessDetails(order: OrderOverviewDto): Promise<OrderDetailsDto> {
    const machineAssignments: GetMachineAssignmentDto[] = await this.serviceProcessService.getMachineAssignments(order.id);
    const serviceProcessStatus: ServiceProcessStatusDto[] = await this.serviceProcessService.getServiceStates(order.id);
    return new OrderDetailsDto(order, serviceProcessStatus, machineAssignments);
  }
}
