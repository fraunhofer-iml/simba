/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { ServiceProcess } from '@prisma/client';

export abstract class NftFactory {
  abstract mintNFT(
    serviceProcess: ServiceProcess,
    invoiceNumber: string,
    invoicePdf: any,
    invoiceURL: string,
    metadata: any,
    metadataURL: string
  ): Promise<TokenReadDto>;
  abstract readNFT(tokenId: number): Promise<TokenReadDto>;
  abstract readNFTForInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto>;
  abstract readAllNfts(): Promise<TokenReadDto[]>;
  abstract getPaymentState(tokenReadDto: TokenReadDto): PaymentStates;
  abstract updateNFTStatus(tokenId: number, status: PaymentStates): Promise<TokenReadDto>;
}
