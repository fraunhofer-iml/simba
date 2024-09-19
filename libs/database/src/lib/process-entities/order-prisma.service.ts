import { PrismaService } from '../prisma.service';
import {Injectable, Logger} from '@nestjs/common';
import {Order, Prisma} from '@prisma/client';
import * as util from "node:util";
import {OrderWithAcceptedOffer} from "./order.types";
import {OrderStatesEnum} from "@ap3/config";

@Injectable()
export class OrderPrismaService {
  private logger = new Logger(OrderPrismaService.name);
  constructor(private prisma: PrismaService) {
  }

  async getOrder(id: string):Promise<OrderWithAcceptedOffer | null> {
    const order = await this.prisma.order.findUnique({
      where: {id: String(id)},
      include: {
        acceptedOffer: true,
      }
    });

    return order;
  }

  async getOrders(states: string[]):Promise<Order[]>{
    return this.prisma.order.findMany({
      where: {
        status: {
          in: states,
        }
      }
    });
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

  async setOrderState(id: string, state: OrderStatesEnum):Promise<Order>{
    return this.prisma.order.update({
      where: {id: String(id)},
      data: {
        status: state.toString()
      }
    })
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
          {id: String(id)}
      });
  }
}
