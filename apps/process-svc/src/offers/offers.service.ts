import { CreateOfferAmqpDto, OfferAmqpDto } from '@ap3/amqp';
import { OFFER_STATES_TO_SHOW, OfferStatesEnum, OrderStatesEnum } from '@ap3/config';
import { OfferPrismaService, OrderPrismaService, ServiceProcessPrismaService } from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';
import { Offer } from '@prisma/client';

@Injectable()
export class OffersService {
  private readonly logger = new Logger(OffersService.name);
  constructor(
    private readonly offerPrismaService: OfferPrismaService,
    private readonly orderPrismaService: OrderPrismaService,
    private readonly serviceProcess: ServiceProcessPrismaService
  ) {}

  async createOffers(orderId: string): Promise<boolean> {
    try {
      this.logger.debug(`Create new offers for order ${orderId}`);
      const offers: CreateOfferAmqpDto[] = [];
      //TODO: Replace with CPPS scheduler integration
      for (let i = 0; i < 4; i++) {
        const offer = new CreateOfferAmqpDto();
        offer.price = i + 0.4;
        offer.orderId = orderId;
        offers.push(offer);
      }
      for (const offer of offers) {
        await this.offerPrismaService.createOffer(offer.toPrismaEntity(orderId));
      }
      return true;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async findAll(): Promise<OfferAmqpDto[]> {
    const offerDtos: OfferAmqpDto[] = [];
    const offers: Offer[] = await this.offerPrismaService.getOffers();
    for (const offer of offers) {
      const serviceProcess = await this.serviceProcess.getServiceProcessById(offer.serviceProcessId);
      offerDtos.push(OfferAmqpDto.fromPrismaEntity(offer, serviceProcess.orderId));
    }
    return offerDtos;
  }

  async findAllByOrderId(orderId: string): Promise<OfferAmqpDto[]> {
    this.logger.debug(`Get offers filtered by order id ${orderId}`);
    const offerDtos: OfferAmqpDto[] = [];
    const offers: Offer[] = await this.offerPrismaService.getOffersByOrderId(orderId, OFFER_STATES_TO_SHOW);
    for (const offer of offers) {
      const serviceProcess = await this.serviceProcess.getServiceProcessById(offer.serviceProcessId);
      offerDtos.push(OfferAmqpDto.fromPrismaEntity(offer, serviceProcess.orderId));
    }
    return offerDtos;
  }

  async findOne(id: string): Promise<OfferAmqpDto> {
    const offer: Offer = await this.offerPrismaService.getOffersById(id);
    const serviceProcess = await this.serviceProcess.getServiceProcessById(offer.serviceProcessId);
    return OfferAmqpDto.fromPrismaEntity(offer, serviceProcess.orderId);
  }

  async accept(offerId: string): Promise<OfferAmqpDto> {
    this.logger.debug(`Accepting offer #${offerId} for order`);
    const offer: Offer = await this.offerPrismaService.acceptOffer(offerId);
    const relatedServiceProcess = await this.serviceProcess.getServiceProcessById(offer.serviceProcessId);
    const openOffersOfOrder: Offer[] = await this.offerPrismaService.getOffersByOrderId(relatedServiceProcess.orderId, [
      OfferStatesEnum.OPEN.toString(),
    ]);
    await this.declineOffers(openOffersOfOrder);
    await this.orderPrismaService.setOrderState(relatedServiceProcess.orderId, OrderStatesEnum.PLANNED);
    return OfferAmqpDto.fromPrismaEntity(offer, relatedServiceProcess.orderId);
  }

  async decline(orderId: string): Promise<boolean> {
    this.logger.debug(`Declining offers for order #${orderId}`);
    const offers: Offer[] = await this.offerPrismaService.getOffersByOrderId(orderId, [OfferStatesEnum.OPEN.toString()]);
    await this.declineOffers(offers);
    return !!(await this.orderPrismaService.setOrderState(orderId, OrderStatesEnum.CANCELED));
  }

  private async declineOffers(offers: Offer[]): Promise<void> {
    if (offers && offers.length > 0) {
      for (const offer of offers) {
        await this.offerPrismaService.setOfferState(offer.id, OfferStatesEnum.REFUSED);
      }
    } else {
      this.logger.warn(`No offers found for order`);
    }
  }
}
