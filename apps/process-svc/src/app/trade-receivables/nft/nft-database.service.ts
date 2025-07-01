/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { NftPrismaService } from '@ap3/database';
import { PaymentStates } from '@ap3/util';
import { Injectable } from '@nestjs/common';
import { Nft, ServiceProcess } from '@prisma/client';
import { AdditionalDataDto } from '@ap3/blockchain-connector';
import { TokenAssetDto, TokenHierarchyDto, TokenMetadataDto, TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { createHash } from 'crypto';
import { NFT_ADDRESS, NFT_MINTER_ADDRESS, NFT_OWNER_ADDRESS } from './nft.constants';
import { NftInterface } from './nft.interface';

@Injectable()
export class NftDatabaseService implements NftInterface{

  constructor(
    private readonly nftPrismaService: NftPrismaService,
  ) {}

  public async mintNFT(
    serviceProcess: ServiceProcess,
    invoiceNumber: string,
    invoicePdf: any,
    invoiceURL: string,
    metadata: any,
    metadataURL: string
  ): Promise<TokenReadDto> {
    const serviceProcessHash: string = this.hashData(JSON.stringify(serviceProcess));
    const invoiceHash: string = this.hashData(invoicePdf.toString());
    const metadataHash: string = this.hashData(JSON.stringify(metadata));

    const createdToken: Nft = await this.nftPrismaService.createNft(
      {
        remoteId: invoiceNumber,
        ownerAddress: NFT_OWNER_ADDRESS,
        minterAddress: NFT_MINTER_ADDRESS,
        tokenAddress: NFT_ADDRESS,
        assetInvoiceUrl: invoiceURL,
        assetInvoiceHash: invoiceHash,
        metadataUrl: metadataURL,
        metadataHash: metadataHash,
        additionalData: JSON.stringify(new AdditionalDataDto(serviceProcess.id, serviceProcessHash, PaymentStates.OPEN))
      }
    );
    return createdToken ? this.convertToDto(createdToken) : null;
  }

  private hashData(hashInput: string): string {
    return createHash('sha256').update(hashInput).digest('hex');
  }

  private convertToDto(nft: Nft): TokenReadDto {
    return new TokenReadDto(
      nft.remoteId,
      new TokenAssetDto(nft.assetInvoiceUrl, nft.assetInvoiceHash),
      new TokenMetadataDto(nft.metadataUrl, nft.metadataHash),
      nft.additionalData,
      new TokenHierarchyDto(false, [], []),
      nft.ownerAddress,
      nft.minterAddress,
      nft.createdOn.toISOString(),
      nft.lastUpdatedOn.toISOString(),
      Number(nft.id),
      nft.tokenAddress,
    );
  }

  public async readNFT(tokenId: number): Promise<TokenReadDto> {
    const foundToken: Nft = await this.nftPrismaService.getNft(tokenId);
    return foundToken ? this.convertToDto(foundToken) : null;
  }

  public async readNFTForInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto> {
    const updatedToken: Nft[] = await this.nftPrismaService.getNftByInvoiceNumber(invoiceNumber);
    return updatedToken.length > 0 ? this.convertToDto(updatedToken[0]) : null;
  }

  public getPaymentState(tokenReadDto: TokenReadDto): PaymentStates {
    return JSON.parse(tokenReadDto.additionalData).status;
  }

  public async updateNFTStatus(tokenId: number, status: PaymentStates): Promise<TokenReadDto> {
    const foundToken: TokenReadDto = await this.readNFT(tokenId);

    const additionalData: AdditionalDataDto = JSON.parse(foundToken.additionalData);
    additionalData.status = status;

    const updatedToken: Nft = await this.nftPrismaService.updateNft(tokenId, JSON.stringify(additionalData));
    return updatedToken ? this.convertToDto(updatedToken) : null;
  }

  public async readAllNfts(): Promise<TokenReadDto[]> {
      const foundNfts: Nft[] = await this.nftPrismaService.getNfts();
      return foundNfts.map(nft => this.convertToDto(nft));
  }
}
