import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { Order, Prisma, ServiceStatus } from '@prisma/client';
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
            states: true,
          },
        },
      },
    });
    return order;
  }

  async getOrders(states: string[]): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        serviceProcess: {
          include: {
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

  async getLatestServiceStatus(orderId: string): Promise<ServiceStatus | null> {
    return this.prisma.serviceStatus.findFirst({
      where: {
        serviceProcess: {
          orderId: orderId,
        },
      },
      include: {
        serviceProcess: {
          select: {
            orderId: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    } as Prisma.ServiceStatusFindFirstArgs);
  }
}
