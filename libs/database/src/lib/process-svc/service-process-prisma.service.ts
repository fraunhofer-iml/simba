import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { ServiceProcess } from '@prisma/client';
import { ServiceStatesEnum } from '../constants';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ServiceProcessPrismaService {
  private logger = new Logger(ServiceProcessPrismaService.name);

  constructor(private prismaService: PrismaService) {}

  async getServiceProcessById(id: string): Promise<ServiceProcess | null> {
    try {
      return await this.prismaService.serviceProcess.findUnique({ where: { id: id } });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async setServiceProcessAcceptedOffer(id: string, offerId: string): Promise<ServiceProcess | null> {
    try {
      return await this.prismaService.serviceProcess.update({ where: { id: id }, data: { acceptedOfferId: offerId } });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async setServiceState(orderId: string, state: ServiceStatesEnum): Promise<ServiceProcess> {
    return this.prismaService.serviceProcess.update({
      where: {
        orderId: String(orderId),
      },
      include: {
        order: true,
      },
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
}
