/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { Nft, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class NftPrismaService {
  private logger = new Logger(NftPrismaService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async createNft(data: Prisma.NftCreateInput): Promise<Nft | null> {
    this.logger.verbose(`Insert new Nft ${data}`);
    try {
      return await this.prismaService.nft.create({ data });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getNft(tokenId: number): Promise<Nft | null> {
    try {
      return await this.prismaService.nft.findUnique({
        where: { id: tokenId },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getNftByInvoiceNumber(invoiceNumber: string): Promise<Nft[] | null> {
    try {
      return await this.prismaService.nft.findMany({
        where: { remoteId: invoiceNumber },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getNfts(): Promise<Nft[]> {
    try {
      return this.prismaService.nft.findMany();
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async updateNft(id: number, additionalData: string, currentDateIsoString: string): Promise<Nft | null> {
    try {
      return await this.prismaService.nft.update({
        where: { id: id },
        data: { additionalData: additionalData, lastUpdatedOn: currentDateIsoString },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getHighestNftId() {
    try {
      const result = await this.prismaService.nft.aggregate({
        _max: {
          id: true,
        },
      });

      const maxId = result._max.id && result._max.id != 0 ? result._max.id + 1 : 0;
      return maxId;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
