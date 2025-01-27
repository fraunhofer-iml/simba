import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { OrderOverview } from '../types';

@Injectable()
export class OrderPrismaService {
  private logger = new Logger(OrderPrismaService.name);
  constructor(private prisma: PrismaService) {}

  async getOverviewOrder(id: string): Promise<OrderOverview | null> {
    const whereClause: Prisma.OrderWhereInput = { id: String(id) };
    const order = await this.getOverviewOrders(whereClause);
    return order && order.length == 1 ? order[0] : null;
  }

  async getOrdersForOverview(companyId: string) {
    const whereClause: Prisma.OrderWhereInput = {
      OR: [
        { buyerId: String(companyId) },
        { sellerId: String(companyId) },
        { serviceProcess: { machineAssignments: { some: { machine: { companyId: String(companyId) } } } } },
      ],
    };
    return await this.getOverviewOrders(whereClause);
  }

  private async getOverviewOrders(whereClause: Prisma.OrderWhereInput): Promise<OrderOverview[] | null> {
    return this.prisma.order.findMany({
      where: whereClause,
      select: {
        id: true,
        documentIssueDate: true,
        vatCurrency: true,
        orderLines: {
          select: {
            item: true,
            requestedQuantity: true,
          },
        },
        serviceProcess: {
          include: {
            acceptedOffer: {
              select: {
                id: true,
                price: true,
              },
            },
            machineAssignments: {
              include: {
                machine: true,
              },
            },
            offers: {
              select: {
                id: true,
              },
            },
            states: true,
            invoices: {
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

  async deleteOrder(id: string): Promise<Order | null> {
    return this.prisma.order.delete({
      where: { id: String(id) },
    });
  }
}
