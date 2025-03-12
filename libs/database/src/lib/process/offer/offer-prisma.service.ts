/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { Offer, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class OfferPrismaService {
  private logger = new Logger(OfferPrismaService.name);

  constructor(private prisma: PrismaService) {}

  async createOffer(data: Prisma.OfferCreateInput): Promise<Offer> {
    this.logger.verbose('Insert new offer to database');
    try {
      return await this.prisma.offer.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getOffers(): Promise<Offer[]> {
    this.logger.verbose('Return all offers from database');
    try {
      return await this.prisma.offer.findMany();
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getOffersByOrderId(orderId: string, states?: string[]): Promise<Offer[]> {
    this.logger.verbose(`Return all offers by Id ${orderId} from database`);
    try {
      let whereStatus: Prisma.OfferWhereInput = {};
      if(states){
        whereStatus = { status: {
        in: states,
        }}
      }
      return await this.prisma.offer.findMany({
        where: {
          AND: [{
            serviceProcess: {
              orderId: {
                equals: String(orderId),
              },
            }},
            whereStatus
          ]
        },
        include: {
          serviceProcess: {
            include: {
              states: true,
            },
          },
        },
      } as Prisma.OfferFindManyArgs);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getOffersById(id: string): Promise<Offer> {
    this.logger.verbose('Return offer by id from database');
    try {
      return await this.prisma.offer.findUniqueOrThrow({
        where: { id: id },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async setOfferState(id: string, state: string): Promise<Offer> {
    try {
      return await this.prisma.offer.update({
        where: { id: id },
        data: {
          status: state,
          decisionDate: new Date(),
        },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
