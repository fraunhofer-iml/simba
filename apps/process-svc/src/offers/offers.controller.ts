import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OffersService } from './offers.service';
import {OfferAmqpDto, OfferMessagePatterns} from "@ap3/amqp";

@Controller()
export class OffersController {
  constructor(private readonly offerService: OffersService) {}

  @MessagePattern(OfferMessagePatterns.CREATE)
  async create(@Payload() orderId: string): Promise<boolean> {
    return await this.offerService.createOffers(orderId);
  }

  @MessagePattern(OfferMessagePatterns.READ_ALL)
  async findAll(): Promise<OfferAmqpDto[]> {
    return this.offerService.findAll();
  }

  @MessagePattern(OfferMessagePatterns.READ_BY_ORDER_ID)
  async findAllByOrderId(@Payload() orderId: string): Promise<OfferAmqpDto[]> {
    return this.offerService.findAllByOrderId(orderId);
  }

  @MessagePattern(OfferMessagePatterns.READ_BY_ID)
  async findOne(@Payload() id: string): Promise<OfferAmqpDto> {
    return this.offerService.findOne(id);
  }

  @MessagePattern(OfferMessagePatterns.ACCEPT_BY_ID)
  async acceptOffer(@Payload() id: string): Promise<OfferAmqpDto> {
    return this.offerService.accept(id);
  }

  @MessagePattern(OfferMessagePatterns.DECLINE_BY_ID)
  async declineOffers(@Payload() id: string[]): Promise<boolean> {
    return this.offerService.decline(id);
  }
}
