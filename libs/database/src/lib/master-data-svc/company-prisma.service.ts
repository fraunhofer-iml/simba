import * as util from 'node:util';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Company } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompanyPrismaService {
  private logger = new Logger(CompanyPrismaService.name);

  constructor(private prisma: PrismaService) {}

  async getCompany(id: string): Promise<Company | null> {
    this.logger.debug(`Return company by id ${id} from database`);
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: id },
      });
      if (!company) {
        throw new NotFoundException(`Company with id ${id} was not found in database.`);
      }
      return company;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getCompanies(): Promise<Company[]> {
    this.logger.debug(`Return all companies from database`);
    return this.prisma.company.findMany({});
  }
}
