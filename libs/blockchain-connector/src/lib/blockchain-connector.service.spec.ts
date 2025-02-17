import { PaymentStates } from '@ap3/util';
import {
  DataIntegrityService,
  TokenAssetDto,
  TokenHierarchyDto,
  TokenMetadataDto,
  TokenMintDto,
  TokenMintService,
  TokenReadDto,
  TokenReadService,
  TokenUpdateDto,
  TokenUpdateService,
} from 'nft-folder-blockchain-connector';
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProcess } from '@prisma/client';
import { AdditionalDataDto } from './additional.data.dto';
import { BlockchainConnectorService } from './blockchain-connector.service';

describe('BlockchainConnectorService', () => {
  let service: BlockchainConnectorService;

  let mockedDataIntegrityService: Partial<DataIntegrityService>;

  let mockedTokenMintService: Partial<TokenMintService>;

  let mockedTokenUpdateService: Partial<TokenUpdateService>;

  let mockedTokenReadService: Partial<TokenReadService>;

  const serviceProcess: ServiceProcess = {
    id: 'testServiceProcessId',
    dueCalendarWeek: 0,
    dueYear: 0,
    scheduledDate: new Date(0),
    orderId: 'orderId',
    acceptedOfferId: 'offerId',
  };

  const testHashValue = 'test hash';

  const tokenReadDto: TokenReadDto = new TokenReadDto(
    'test invoice number',
    new TokenAssetDto('test uri', testHashValue),
    new TokenMetadataDto('test uri', testHashValue),
    JSON.stringify(new AdditionalDataDto(serviceProcess.id, testHashValue, PaymentStates.OPEN)),
    new TokenHierarchyDto(false, [], []),
    'test owner address',
    'test minter address',
    'test created date',
    'test update date',
    0,
    'test token address'
  );

  beforeEach(async () => {
    mockedDataIntegrityService = {
      hashData() {
        return testHashValue;
      },
    };

    mockedTokenMintService = {
      mintToken(tokenMintDto: TokenMintDto, appendtoHierarchy: boolean) {
        return Promise.resolve(
          new TokenReadDto(
            tokenMintDto.remoteId,
            tokenMintDto.asset,
            tokenMintDto.metadata,
            tokenMintDto.additionalData,
            new TokenHierarchyDto(appendtoHierarchy, [], tokenMintDto.parentIds),
            'test owner address',
            'test minter address',
            'test created date',
            'test update date',
            0,
            'test token address'
          )
        );
      },
    };

    mockedTokenUpdateService = {
      updateToken(tokenId: number, tokenUpdateDto: TokenUpdateDto) {
        return Promise.resolve(
          new TokenReadDto(
            'test invoice number',
            new TokenAssetDto(
              tokenUpdateDto.assetUri ? tokenUpdateDto.assetUri : '',
              tokenUpdateDto.assetHash ? tokenUpdateDto.assetHash : ''
            ),
            new TokenMetadataDto(
              tokenUpdateDto.metadataUri ? tokenUpdateDto.metadataUri : '',
              tokenUpdateDto.metadataHash ? tokenUpdateDto.metadataHash : ''
            ),
            tokenUpdateDto.additionalData ? tokenUpdateDto.additionalData : '',
            new TokenHierarchyDto(false, [], []),
            'test owner address',
            'test minter address',
            'test created date',
            'test update date',
            tokenId,
            'test token address'
          )
        );
      },
    };

    mockedTokenReadService = {
      getToken() {
        return Promise.resolve(tokenReadDto);
      },
      getTokens() {
        return Promise.resolve([tokenReadDto]);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DataIntegrityService, useValue: mockedDataIntegrityService },
        { provide: TokenMintService, useValue: mockedTokenMintService },
        { provide: TokenUpdateService, useValue: mockedTokenUpdateService },
        { provide: TokenReadService, useValue: mockedTokenReadService },
        BlockchainConnectorService,
      ],
    }).compile();

    service = module.get<BlockchainConnectorService>(BlockchainConnectorService);
  });

  it('should create new nft', async () => {
    expect(await service.mintNFT(serviceProcess, 'test invoice number', 'test', 'test uri', 'test', 'test uri')).toEqual(tokenReadDto);
  });

  it('should update nft status', async () => {
    const updatedAdditionalData: AdditionalDataDto = JSON.parse(tokenReadDto.additionalData);
    updatedAdditionalData.status = PaymentStates.PAID;

    const updatedReadDto: TokenReadDto = tokenReadDto;
    updatedReadDto.additionalData = JSON.stringify(updatedAdditionalData);

    expect(await service.updateNFTStatus(0, PaymentStates.PAID)).toEqual(updatedReadDto);
  });

  it('should read nft with token id', async () => {
    expect(await service.readNFT(0)).toEqual(tokenReadDto);
  });

  it('should read nft with remote id', async () => {
    expect(await service.readNFTForInvoiceNumber(serviceProcess.id)).toEqual(tokenReadDto);
  });
});
