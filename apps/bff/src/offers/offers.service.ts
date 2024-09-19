import {Inject, Injectable, Logger} from '@nestjs/common';
import {OfferDto} from '@ap3/api';
import {ClientProxy} from '@nestjs/microservices';
import {AmqpBrokerQueues, OfferMessagePatterns, OrderAmqpDto} from '@ap3/amqp';
import {firstValueFrom} from 'rxjs';

@Injectable()
export class OffersService {
  private logger = new Logger(OffersService.name);

  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {
  }

  async findAll(orderId?: string): Promise<OfferDto[]> {
    let offers: OfferDto[] = [];
    if (orderId) {
      this.logger.debug(`Get offers filtered by order id ${orderId}`);
      offers = await firstValueFrom<OfferDto[]>(this.processAMQPClient.send(OfferMessagePatterns.READ_BY_ORDER_ID, orderId));
    } else {
      this.logger.debug(`Get all offers`);
      offers = await firstValueFrom<OfferDto[]>(this.processAMQPClient.send(OfferMessagePatterns.READ_ALL, {}));
    }
    return offers;
  }

  async createOffer(orderId: string): Promise<boolean> {
    this.logger.debug(`Send ${OfferMessagePatterns.CREATE} for order ${orderId}`);
    return await firstValueFrom<boolean>(this.processAMQPClient.send(OfferMessagePatterns.CREATE, orderId));
  }

  async findOne(offerId: string): Promise<OfferDto> {
    return await firstValueFrom<OfferDto>(this.processAMQPClient.send(OfferMessagePatterns.READ_BY_ID, offerId));
  }

  async acceptOffer(offerId: string): Promise<boolean> {
    return await firstValueFrom<boolean>(this.processAMQPClient.send(OfferMessagePatterns.ACCEPT_BY_ID, offerId));
  }

  async declineOffers(orderId: string): Promise<boolean> {
    this.logger.debug(`Order id ${orderId}`);
    return await firstValueFrom<boolean>(this.processAMQPClient.send(OfferMessagePatterns.DECLINE_ALL_OF_ORDER, [orderId]));
  }

  async loadOfferRef(dto: OrderAmqpDto): Promise<OfferDto> {
    let acceptedOffer: OfferDto;
    if (dto.acceptedOfferId) {
      acceptedOffer = await this.findOne(dto.acceptedOfferId);
    }
    return acceptedOffer;
  }
}
