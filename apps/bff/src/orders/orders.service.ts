import * as util from 'node:util';
import { AmqpBrokerQueues, CreateOrderAmqpDto, OrderAmqpDto, OrderMessagePatterns } from '@ap3/amqp';
import { CreateOrderDto, OrderDto, OrderOverviewDto } from '@ap3/api';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy,
    private readonly offerService: OffersService,
    private readonly productService: ProductsService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderOverviewDto> {
    try {
      //TODO: Implement Company Services and a Currency decision
      const createOrder: CreateOrderAmqpDto = OrderDto.toAMQPDto(createOrderDto, 'Euro', 'pt0001', 'pt0002');
      const receivedOrder: OrderAmqpDto = await firstValueFrom<OrderAmqpDto>(
        this.processAMQPClient.send(OrderMessagePatterns.CREATE, createOrder)
      );
      await this.offerService.createOffer(receivedOrder.id);

      const productRef = await this.productService.loadProductRefs(receivedOrder);
      const offerRef = await this.offerService.loadOfferRef(receivedOrder);
      return OrderOverviewDto.toOrderOverviewDto(receivedOrder, productRef, offerRef);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async findAll(): Promise<OrderOverviewDto[]> {
    const frontendDtos: OrderOverviewDto[] = [];
    let orders: OrderAmqpDto[] = [];
    try {
      orders = await firstValueFrom<OrderAmqpDto[]>(this.processAMQPClient.send(OrderMessagePatterns.READ_ALL, {}));

      for (const order of orders) {
        const productRef = await this.productService.loadProductRefs(order);
        const offerRef = await this.offerService.loadOfferRef(order);
        const orderOverview = OrderOverviewDto.toOrderOverviewDto(order, productRef, offerRef);
        frontendDtos.push(orderOverview);
      }
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
      const productRef = await this.productService.loadProductRefs(order);
      const offerRef = await this.offerService.loadOfferRef(order);
      return OrderOverviewDto.toOrderOverviewDto(order, productRef, offerRef);
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
}
