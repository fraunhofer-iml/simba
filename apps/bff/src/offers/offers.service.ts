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
      return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.READ_ALL,orderId));
    } else {
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

  async declineOffers(offerId: string):Promise<boolean> {
    return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.DECLINE_BY_ID,[offerId]));
  }
}
