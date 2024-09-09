import { Inject, Injectable } from '@nestjs/common';
import { OfferDto, OpenOffersMock } from '@ap3/api';
import { ClientProxy } from '@nestjs/microservices';
import { AmqpBrokerQueues, OfferMessagePatterns, OrderMessagePatterns } from '@ap3/amqp';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OffersService {

  constructor( @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient : ClientProxy){}

  async findAll(orderId: string): Promise<OfferDto[]> {
    return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.READ_ALL,{orderId}));
  }

  async findOne(offerId: string): Promise<OfferDto> {
    return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.READ_BY_ID,{offerId}));
  }

  async acceptOffer(offerId: string): Promise<boolean> {
    return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.ACCEPT_BY_ID,{offerId}));
  }

  async declineOffers(offerId: string):Promise<boolean> {
    return firstValueFrom(this.processAMQPClient.send(OfferMessagePatterns.DECLINE_BY_ID,{offerId}));
  }
}
