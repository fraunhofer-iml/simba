import { PrismaService } from '../prisma.service';
import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import * as util from "node:util";
import {Offer, Prisma} from "@prisma/client";
import {OfferStatesEnum} from "@ap3/config";

@Injectable()
export class OfferPrismaService {
  private logger = new Logger(OfferPrismaService.name);

  constructor(private prisma: PrismaService) {
  }

  async createOffer(data: Prisma.OfferCreateInput): Promise<Offer>{
    this.logger.debug("Insert new offer to database");
    try{
      return await this.prisma.offer.create({data});
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getOffers(): Promise<Offer[]>{
    this.logger.debug("Return all offers from database");
    try{
      return await this.prisma.offer.findMany();
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getOffersByOrderId(orderId: string, states: string[]):Promise<Offer[]>{
    this.logger.debug(`Return all offers by Id ${orderId} from database`);
    try{
      return await this.prisma.offer.findMany({
        where: {
          orderId: {
            equals: String(orderId),
          },
          status: {
            in: states,
          }
        },
        include: {
          order: true,
        }
      });
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getOffersById(id: string):Promise<Offer>{
    this.logger.debug("Return offer by id from database");
    try{
      const offer = await this.prisma.offer.findUnique({
        where: { id: id }
      });
      if(!offer){
        throw new NotFoundException(`Offer with id ${id} was not found in database.`);
      }
      return offer;
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async updateOffer(id: string, data: Prisma.OfferUpdateInput):Promise<void>{
    this.logger.debug(`Update offer with id ${id} in database`);
    try{
      await this.prisma.offer.update({
        where: { id: id },
        data:  data,
      });
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async setOfferState(id: string, state: string):Promise<Offer>{
    try{
      return await this.prisma.offer.update({
        where: {id: id},
        data: {
          status: state,
        },
      });
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async acceptOffer(id: string): Promise<Offer> {
    this.logger.debug(`Accept offer with id ${id} in database`);
    const offer: Offer = await this.getOffersById(id);
    this.logger.debug(`Connect offer to order #${offer.orderId}`);
    try {
      return await this.prisma.offer.update({
        where: {id: id},
        data: {
          acceptedByOrder:{
            connect: {
              id: String(offer.orderId)
            }
          },
          status: OfferStatesEnum.ACCEPTED,
        },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
