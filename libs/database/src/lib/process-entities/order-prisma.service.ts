import { PrismaService } from '../prisma.service';
import {Injectable, Logger} from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import * as util from "node:util";

@Injectable()
export class OrderPrismaService {
  private logger = new Logger(OrderPrismaService.name);
  constructor(private prisma: PrismaService) {
  }

  async getOrder(whereId: Prisma.OrderWhereUniqueInput):Promise<Order | null> {
    return this.prisma.order.findUnique({where: whereId});
  }

  async getOrders():Promise<Order[]>{
    return this.prisma.order.findMany();
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order>{
    this.logger.debug("Insert new order via prisma");
    try{
      return await this.prisma.order.create({data});
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async updateOrder(params:{where: Prisma.OrderWhereUniqueInput, data: Prisma.OrderUpdateInput}): Promise<Order>{
    const {where, data} = params;
    return this.prisma.order.update({
      data,
      where
    })
  }

  async deleteOrder(whereId: Prisma.OrderWhereUniqueInput) {
    this.prisma.order.delete({where: whereId});
  }
}
