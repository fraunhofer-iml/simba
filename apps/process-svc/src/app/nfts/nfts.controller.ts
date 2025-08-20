/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceIdAndPaymentStateAmqpDto, NftMessagePatterns } from '@ap3/amqp';
import { CreateNftDto } from '@ap3/api';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NftsService } from './nfts.service';

@Controller('nft')
export class NftsController {
  constructor(private readonly nftService: NftsService) {}

  @MessagePattern(NftMessagePatterns.CREATE)
  async createNft(@Payload() createNftDto: CreateNftDto): Promise<TokenReadDto> {
    return this.nftService.createNft(createNftDto);
  }

  @MessagePattern(NftMessagePatterns.UPDATE)
  async updateNftPaymentStatus(@Payload() statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    return await this.nftService.updateNft(statusChanges);
  }

  @MessagePattern(NftMessagePatterns.READ_ALL)
  async readAllNfts(): Promise<TokenReadDto[]> {
    return this.nftService.returnAllNFTs();
  }

  @MessagePattern(NftMessagePatterns.READ_BY_ID)
  async readNftByInvoiceNumber(@Payload() invoiceNumber: string): Promise<TokenReadDto> {
    return this.nftService.getNftByInvoiceNumber(invoiceNumber);
  }
}
