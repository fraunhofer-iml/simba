import {Inject, Injectable, Logger} from '@nestjs/common';
import { OfferDto } from '@ap3/api';
import { ClientProxy } from '@nestjs/microservices';
import { AmqpBrokerQueues, OfferMessagePatterns } from '@ap3/amqp';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OffersService {
  private logger = new Logger(OffersService.name);

  constructor( @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient : ClientProxy){}

  async findAll(orderId?: string): Promise<OfferDto[]> {
    if(orderId){
      this.logger.debug(`Get offers filtered by order id ${orderId}`);
      return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.READ_BY_ORDER_ID,orderId));
    } else {
      this.logger.debug(`Get all offers`);
      return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.READ_ALL, {}));
    }
  }

  async createOffer(orderId:string):Promise<void>{
    this.logger.debug(`Send ${OfferMessagePatterns.CREATE} for order ${orderId}`);
    await firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.CREATE, orderId));
  }

  async findOne(offerId: string): Promise<OfferDto> {
    return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.READ_BY_ID, offerId));
  }

  async acceptOffer(offerId: string): Promise<boolean>{
    return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.ACCEPT_BY_ID, offerId));
  }

  async declineOffers(offerId: string):Promise<void> {
    this.logger.warn('NOT YET IMPLEMENTED')
    this.logger.debug(`Order id ${offerId}`);
    return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.DECLINE_BY_ID,[offerId]));
  }
}
