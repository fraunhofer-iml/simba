import {Injectable, Logger, NotImplementedException} from '@nestjs/common';
import {OfferPrismaService} from "@ap3/database";
import {OfferAmqpDto, CreateOfferAmqpDto} from "@ap3/amqp";
import {Offer} from "@prisma/client";

@Injectable()
export class OffersService {
  private logger = new Logger(OffersService.name);
  constructor(private readonly offerPrismaService: OfferPrismaService) {
  }

  async createOffers(orderId: string){
    try{
      this.logger.debug(`Create new offers for order ${orderId}`);
      const offers: CreateOfferAmqpDto[] = [];
      //TODO: Replace with CPPS scheduler integration
      for(let i = 0; i < 4; i++){
        const offer = new CreateOfferAmqpDto();
        offer.price = i+0.4;
        offer.orderId= orderId;
        offers.push(offer)
      }
      offers.forEach((offer: CreateOfferAmqpDto) => {
        this.offerPrismaService.createOffer(offer.toPrismaEntity());
      })
    }catch (e){
      this.logger.error(e);
      throw e;
    }
  }

  async findAll(): Promise<OfferAmqpDto[]> {
    const offerDtos: OfferAmqpDto[] = [];
    const offers: Offer[] = await this.offerPrismaService.getOffers();
    offers.forEach((offer) => {
      offerDtos.push(OfferAmqpDto.fromPrismaEntity(offer));
    })
    return offerDtos;
  }

  async findAllByOrderId(orderId: string): Promise<OfferAmqpDto[]>{
    this.logger.debug(`Get offers filtered by order id ${orderId}`);
    const offerDtos: OfferAmqpDto[] = [];
    const offers: Offer[] = await this.offerPrismaService.getOffersByOrderId(orderId);
    offers.forEach((offer) => {
      offerDtos.push(OfferAmqpDto.fromPrismaEntity(offer));
    })
    return offerDtos;
  }

  async findOne(id: string): Promise<OfferAmqpDto> {
    const offer: Offer = await this.offerPrismaService.getOffersById(id);
    return OfferAmqpDto.fromPrismaEntity(offer);
  }

  async accept(id: string): Promise<void>{
    await this.offerPrismaService.acceptOffer(id);
  }

  async decline(id: string[]) {
    throw new NotImplementedException("What is the expected behaviour if all offers are rejected?");
  }
}
