import { PaymentStates } from '@ap3/util';
import {
  DataIntegrityService,
  TokenAssetDto,
  TokenMetadataDto,
  TokenMintService,
  TokenReadDto,
  TokenReadService,
  TokenUpdateDto,
  TokenUpdateService,
} from 'nft-folder-blockchain-connector';
import { Injectable } from '@nestjs/common';
import { ServiceProcess } from '@prisma/client';
import { AdditionalDataDto } from './additional.data.dto';

@Injectable()
export class BlockchainConnectorService {
  constructor(
    private readonly dataIntegrityService: DataIntegrityService,
    private readonly tokenMintService: TokenMintService,
    private readonly tokenUpdateService: TokenUpdateService,
    private readonly tokenReadService: TokenReadService
  ) {}

  /**
   * Creates a new NFT from the data of an order. To do this, the serviceProcess object of the order is required to store the hash and the id of the object in the NFT. Invoice and metadata are required to also be stored as a hash in the NFT. The storage locations of the invoice and metadata are also stored.
   * @param serviceProcess The serviceProcess object of the order whose id and hash are to be included in the NFT.
   * @param invoiceNumber The invoice number to be used for the remote id.
   * @param invoicePdf The invoice in ZUGFeRD format, which is to be stored as a hash in the NFT.
   * @param invoiceURL The storage location of the invoice.
   * @param metadata The metadata of the order that is to be stored as a hash in the NFT.
   * @param metadataURL The storage location of the metadata.
   */
  public async mintNFT(
    serviceProcess: ServiceProcess,
    invoiceNumber: string,
    invoicePdf: any,
    invoiceURL: string,
    metadata: any,
    metadataURL: string
  ): Promise<TokenReadDto> {
    const serviceProcessHash: string = this.dataIntegrityService.hashData(Buffer.from(JSON.stringify(serviceProcess)));
    const invoiceHash: string = this.dataIntegrityService.hashData(Buffer.from(invoicePdf.toString()));
    const metadataHash: string = this.dataIntegrityService.hashData(Buffer.from(JSON.stringify(metadata)));

    return this.tokenMintService.mintToken(
      {
        remoteId: invoiceNumber,
        asset: new TokenAssetDto(invoiceURL, invoiceHash),
        metadata: new TokenMetadataDto(metadataURL, metadataHash),
        additionalData: JSON.stringify(new AdditionalDataDto(serviceProcess.id, serviceProcessHash, PaymentStates.OPEN)),
        parentIds: [],
      },
      false
    );
  }

  /**
   * Returns the NFT with the specified token id.
   * @param tokenId The token id of the NFT to be returned.
   */
  public async readNFT(tokenId: number): Promise<TokenReadDto> {
    return this.tokenReadService.getToken(tokenId);
  }

  /**
   * Returns the NFT with the specified service process id.
   * @param serviceProcessId The service process id of the NFT to be returned.
   */
  public async readNFTForServiceProcessId(serviceProcessId: string): Promise<TokenReadDto> {
    return (await this.tokenReadService.getTokens(serviceProcessId))[0];
  }

  /**
   * Returns all NFTs assigned to the current user.
   * The current user is the owner of the private key specified in the environments.
   */
  public async readNFTs(): Promise<TokenReadDto[]> {
    return this.tokenReadService.getTokens();
  }

  /**
   * Updates the status field of the additional data of the NFT.
   * @param tokenId The token id of the NFT whose status is to be changed.
   * @param status The new status to be set for the NFT.
   */
  public async updateNFTStatus(tokenId: number, status: PaymentStates): Promise<TokenReadDto> {
    const foundToken: TokenReadDto = await this.readNFT(tokenId);

    const additionalData: AdditionalDataDto = JSON.parse(foundToken.additionalData);
    additionalData.status = status;

    const tokenUpdateDto: TokenUpdateDto = {
      assetUri: foundToken.asset.uri,
      assetHash: foundToken.asset.hash,
      metadataUri: foundToken.metadata.uri,
      metadataHash: foundToken.metadata.hash,
      additionalData: JSON.stringify(additionalData),
    };

    return this.tokenUpdateService.updateToken(tokenId, tokenUpdateDto);
  }
}
