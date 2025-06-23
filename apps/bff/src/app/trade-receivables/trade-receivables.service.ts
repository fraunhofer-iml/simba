/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AmqpBrokerQueues,
  CreateTradeReceivableAmqpDto,
  InvoiceIdAndPaymentStateAmqpDto,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
} from '@ap3/amqp';
import { CreateNftDto, CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TradeReceivablesService {
  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy,
    @Inject(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) private readonly masterDataAMQPClient: ClientProxy
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    const createTradeReceivableAmqpDto: CreateTradeReceivableAmqpDto = createTradeReceivableDto.toCreateTradeReceivableAmqpDto();
    const tradeReceivableAmqpDto = await firstValueFrom<TradeReceivableAmqpDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, createTradeReceivableAmqpDto).pipe(defaultIfEmpty(null))
    );
    return TradeReceivableDto.fromAmqpDto(tradeReceivableAmqpDto);
  }

  async createNft(createNftDto: CreateNftDto): Promise<TokenReadDto> {
    return firstValueFrom<TokenReadDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE_NFT, createNftDto).pipe(defaultIfEmpty(null))
    );
  }

  async updateNft(statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    return firstValueFrom<boolean>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.UPDATE_NFT, statusChanges).pipe(defaultIfEmpty(null))
    );
  }

  async readAllNfts(): Promise<TokenReadDto[]> {
    return await firstValueFrom<TokenReadDto[]>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL, []).pipe(defaultIfEmpty(null))
    );
  }

  async getNftByInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto> {
    return await firstValueFrom<TokenReadDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, invoiceNumber).pipe(defaultIfEmpty(null))
    );
  }
}
