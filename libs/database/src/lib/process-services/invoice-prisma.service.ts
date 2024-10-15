import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {Invoice, Offer, Prisma} from "@prisma/client";
import util from "node:util";

@Injectable()
export class InvoicePrismaService {
  private logger = new Logger(InvoicePrismaService.name);

  constructor(private prismaService: PrismaService) {
  }

  async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice | null>{
    this.logger.verbose(`Insert new invoice ${util.inspect(data)}`);
    try{
      return await this.prismaService.invoice.create({data});
    }catch (e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getInvoices(): Promise<Invoice[]>{
    this.logger.verbose("Return all invoices from database");
    try{
      return await this.prismaService.invoice.findMany();
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getInvoiceById(id: string):Promise<Invoice>{
    this.logger.verbose("Return invoice by id from database");
    try{
      const invoice  = await this.prismaService.invoice.findUnique({
        where: { invoiceNumber: id }
      });
      if(!invoice){
        throw new NotFoundException(`Invoice with id ${id} was not found in database.`);
      }
      return invoice;
    }catch(e){
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
