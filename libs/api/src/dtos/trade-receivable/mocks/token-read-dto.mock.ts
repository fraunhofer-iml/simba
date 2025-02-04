import {
  TokenAssetDto,
  TokenHierarchyDto,
  TokenMetadataDto,
  TokenReadDto,
} from '@fraunhofer-iml/nft-folder-blockchain-connector';

export const TokenReadDtoMock: TokenReadDto = new TokenReadDto(
  'remoteId',
  new TokenAssetDto(
    'assetUri',
    'assetHash'
  ),
  new TokenMetadataDto(
    'metadataUri',
    'metadataHash'
  ),
  'additionalData',
  new TokenHierarchyDto(
true,
    [],
    []
  ),
  'ownerAddress',
  'minterAddress',
  'createdOn',
  'lastUpdatedOn',
  0,
  'tokenAddress'
);
