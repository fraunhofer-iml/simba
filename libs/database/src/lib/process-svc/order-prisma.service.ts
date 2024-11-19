import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { OrderWithAcceptedOffer } from '../types';
import { OrderOverview } from '../types/order-overview.types';

@Injectable()
export class OrderPrismaService {
  private logger = new Logger(OrderPrismaService.name);
  constructor(private prisma: PrismaService) {}

  async getOrder(id: string): Promise<OrderWithAcceptedOffer | null> {
    const order = <OrderWithAcceptedOffer>await this.prisma.order.findUnique({
      where: { id: String(id) },
      include: {
        orderLines: true,
        serviceProcess: {
          include: {
            acceptedOffer: true,
            states: true,
          },
        },
      },
    });
    return order;
  }

  async getOrders(states: string[]): Promise<OrderWithAcceptedOffer[]> {
    const orders = <OrderWithAcceptedOffer[]>await this.prisma.order.findMany({
      include: {
        orderLines: true,
        serviceProcess: {
          include: {
            acceptedOffer: true,
            states: {
              where: {
                status: {
                  in: states,
                },
              },
            },
          },
        },
      },
    });
    return orders;
  }

  async getOverviewOrder(id: string): Promise<OrderOverview | null> {
    const order = await this.getOrdersForOverview(id);
    return order && order.length == 1 ? order[0] : null;
  }

  async getOrdersForOverview(id?: string): Promise<OrderOverview[] | null> {
    const whereClause: Prisma.OrderWhereInput = id ? { id: String(id) } : {};
    return this.prisma.order.findMany({
      where: whereClause,
      select: {
        id: true,
        documentIssueDate: true,
        orderLines: {
          select: {
            item: true,
            requestedQuantity: true,
          },
        },
        serviceProcess: {
          select: {
            dueCalendarWeek: true,
            dueYear: true,
            machines: true,
            states: true,
            offers: {
              select: {
                id: true,
              },
            },
            acceptedOffer: {
              select: {
                id: true,
                price: true,
              },
            },
            invoice: {
              select: {
                tradeReceivable: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
        buyer: {
          select: {
            id: true,
            name: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order | null> {
    this.logger.debug('Insert new order via prisma');
    try {
      return this.prisma.order.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async updateOrder(params: { where: Prisma.OrderWhereUniqueInput; data: Prisma.OrderUpdateInput }): Promise<Order | null> {
    const { where, data } = params;
    return this.prisma.order.update({
      data,
      where,
    });
  }

  async deleteOrder(id: string): Promise<Order | null> {
    return this.prisma.order.delete({
      where: { id: String(id) },
    });
  }
}
