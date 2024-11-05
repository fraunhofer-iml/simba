import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ServiceProcess } from '@prisma/client';

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
}
