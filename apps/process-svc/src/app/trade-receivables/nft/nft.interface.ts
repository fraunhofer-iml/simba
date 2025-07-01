/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import { ServiceProcess } from '@prisma/client';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';

export interface NftInterface {

  mintNFT(
    serviceProcess: ServiceProcess,
    invoiceNumber: string,
    invoicePdf: any,
    invoiceURL: string,
    metadata: any,
    metadataURL: string
  ): Promise<TokenReadDto>
  readNFT(tokenId: number): Promise<TokenReadDto>
  readNFTForInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto>
  readAllNfts(): Promise<TokenReadDto[]>
  getPaymentState(tokenReadDto: TokenReadDto): PaymentStates
  updateNFTStatus(tokenId: number, status: PaymentStates): Promise<TokenReadDto>
}
