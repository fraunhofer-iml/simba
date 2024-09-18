import { PrismaService } from '../prisma.service';
import {Injectable, Logger} from '@nestjs/common';
import {Order, Prisma} from '@prisma/client';
import * as util from "node:util";
import {OrderWithAcceptedOffer} from "./order.types";

@Injectable()
export class OrderPrismaService {
  private logger = new Logger(OrderPrismaService.name);
  constructor(private prisma: PrismaService) {
  }

  async getOrder(whereId: Prisma.OrderWhereUniqueInput):Promise<OrderWithAcceptedOffer | null> {
    const order = await this.prisma.order.findUnique({
      where: whereId,
      include: {
        acceptedOffer: true,
      }
    });

    return order;
  }

  async getOrders():Promise<Order[]>{
    return this.prisma.order.findMany();
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order | null>{
    this.logger.debug("Insert new order via prisma");
    try{
      return await this.prisma.order.create({data});
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async updateOrder(params:{where: Prisma.OrderWhereUniqueInput, data: Prisma.OrderUpdateInput}): Promise<Order | null>{
    const {where, data} = params;
    return this.prisma.order.update({
      data,
      where
    })
  }

  async deleteOrder(id: string): Promise<Order | null> {
    return this.prisma.order.delete(
      {
        where:
          {id: id}
      });
  }
}
