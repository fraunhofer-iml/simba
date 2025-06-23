/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CreateTradeReceivableAmqpDto,
  InvoiceIdAndPaymentStateAmqpDto,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
} from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TradeReceivablesService } from './trade-receivables.service';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { CreateNftDto } from '@ap3/api';

@Controller('trade-receivables')
export class TradeReceivablesController {
  constructor(private readonly tradeReceivablesService: TradeReceivablesService) {}

  @MessagePattern(TradeReceivableMessagePatterns.CREATE)
  async create(@Payload() createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    return await this.tradeReceivablesService.create(createTradeReceivableDto);
  }

  @MessagePattern(TradeReceivableMessagePatterns.CREATE_NFT)
  async createNft(@Payload() createNftDto: CreateNftDto): Promise<TokenReadDto> {
    return this.tradeReceivablesService.createNft(createNftDto);
  }

  @MessagePattern(TradeReceivableMessagePatterns.UPDATE_NFT)
  async updateNftPaymentStatus(@Payload() statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    return await this.tradeReceivablesService.updateNft(statusChanges);
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_ALL)
  async readAllNfts(): Promise<TokenReadDto[]> {
    return this.tradeReceivablesService.returnAllNFTs();
  }

  @MessagePattern(TradeReceivableMessagePatterns.READ_BY_ID)
  async readNftByInvoiceNumber(@Payload() invoiceNumber: string): Promise<TokenReadDto> {
    return this.tradeReceivablesService.getNftByInvoiceNumber(invoiceNumber);
  }
}
