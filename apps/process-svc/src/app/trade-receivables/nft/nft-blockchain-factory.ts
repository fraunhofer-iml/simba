/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlockchainConnectorService } from '@ap3/blockchain-connector';
import { PaymentStates } from '@ap3/util';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { Injectable } from '@nestjs/common';
import { ServiceProcess } from '@prisma/client';
import { NftFactory } from './nft-factory';

@Injectable()
export class NftBlockchainFactory extends NftFactory {
  constructor(private readonly blockchainConnectorService: BlockchainConnectorService) {
    super();
  }

  public async mintNFT(
    serviceProcess: ServiceProcess,
    invoiceNumber: string,
    invoicePdf: any,
    invoiceURL: string,
    metadata: any,
    metadataURL: string
  ): Promise<TokenReadDto> {
    return this.blockchainConnectorService.mintNFT(serviceProcess, invoiceNumber, invoicePdf, invoiceURL, metadata, metadataURL);
  }

  public async readNFT(tokenId: number): Promise<TokenReadDto> {
    return this.blockchainConnectorService.readNFT(tokenId);
  }

  public async readNFTForInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto> {
    return this.blockchainConnectorService.readNFTForInvoiceNumber(invoiceNumber);
  }

  public getPaymentState(tokenReadDto: TokenReadDto): PaymentStates {
    return this.blockchainConnectorService.getPaymentState(tokenReadDto);
  }

  public async updateNFTStatus(tokenId: number, status: PaymentStates): Promise<TokenReadDto> {
    return this.blockchainConnectorService.updateNFTStatus(tokenId, status);
  }

  public async readAllNfts(): Promise<TokenReadDto[]> {
    return this.blockchainConnectorService.readNFTs();
  }
}
