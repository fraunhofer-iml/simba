/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AmqpBrokerQueues,
  CompanyAndInvoiceAmqpDto,
  InvoiceAmqpDto,
  InvoiceMessagePatterns,
  NftMessagePatterns,
  OrderMessagePatterns,
} from '@ap3/amqp';
import { CreateInvoiceDto, CreateNftDto } from '@ap3/api';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {}

  public async create(orderId: string, companyId: string): Promise<boolean> {
    try {
      const newInvoice: InvoiceAmqpDto = await firstValueFrom<InvoiceAmqpDto>(
        this.processAMQPClient.send(InvoiceMessagePatterns.CREATE, new CreateInvoiceDto(orderId))
      );

      const isOrderFinished = await firstValueFrom<boolean>(this.processAMQPClient.send(OrderMessagePatterns.FINISH_BY_ID, orderId));

      const params: CompanyAndInvoiceAmqpDto = new CompanyAndInvoiceAmqpDto(companyId, newInvoice.id);
      await firstValueFrom<string>(this.processAMQPClient.send(InvoiceMessagePatterns.CREATE_AND_UPLOAD_ZUGFERD_PDF, params));

      await firstValueFrom<TokenReadDto>(this.processAMQPClient.send(NftMessagePatterns.CREATE, new CreateNftDto(newInvoice.id)));

      return isOrderFinished;
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }
}
