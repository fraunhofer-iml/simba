import * as util from 'node:util';
import { OrderStatesEnum } from '@ap3/config';
import { Injectable, Logger } from '@nestjs/common';
import { Order, OrderStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { OrderOverview } from '../types/order-overview.types';

@Injectable()
export class OrderPrismaService {
  private logger = new Logger(OrderPrismaService.name);
  constructor(private prisma: PrismaService) {}

  async getOrder(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id: String(id) },
      include: {
        serviceProcess: {
          include: {
            acceptedOffer: true,
          },
        },
        states: true,
      },
    });
    return order;
  }

  async getOrders(states: string[]): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        states: {
          where: {
            status: {
              in: states,
            },
          },
        },
      },
    });
  }

  async getOverviewOrder(id: string): Promise<OrderOverview | null> {
    const order = await this.getOrdersForOverview(id);
    return order && order.length == 1 ? order[0] : null;
  }

  async getOrdersForOverview(id?: string): Promise<OrderOverview[]> {
    const whereClause: Prisma.OrderWhereInput = id ? { id: String(id) } : {};
    return this.prisma.order.findMany({
      where: whereClause,
      select: {
        id: true,
        documentIssueDate: true,
        states: true,
        orderLines: {
          select: {
            item: true,
          },
        },
        serviceProcess: {
          select: {
            dueCalendarWeek: true,
            dueYear: true,
            machines: true,
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

  async createOrder(data: Prisma.OrderCreateInput): Promise<OrderOverview | null> {
    this.logger.debug('Insert new order via prisma');
    try {
      const order: Order = await this.prisma.order.create({ data });
      return this.getOverviewOrder(order.id);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async setOrderState(id: string, state: OrderStatesEnum): Promise<Order> {
    return this.prisma.order.update({
      where: { id: String(id) },
      data: {
        states: {
          create: {
            status: state.toString(),
            timestamp: new Date(),
          },
        },
      },
    });
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

  async getLatestOrderStatus(id: string): Promise<OrderStatus | null> {
    return this.prisma.orderStatus.findFirst({
      where: {
        orderId: id,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}
