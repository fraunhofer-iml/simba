import { TokenAssetDto, TokenHierarchyDto, TokenMetadataDto, TokenReadDto } from 'nft-folder-blockchain-connector-besu';

export const TokenUpdateDtoMock: TokenReadDto = new TokenReadDto(
  'remoteId',
  new TokenAssetDto('assetUri', 'assetHash'),
  new TokenMetadataDto('metadataUri', 'metadataHash'),
  "{\"serviceProcessId\":\"sp001\",\"serviceProcessHash\":\"b614c49f21dfd1525dee019f62d1a273993e466fc875cffe1332244b56ac4502\",\"status\":\"FINANCED\"}",
  new TokenHierarchyDto(true, [], []),
  'ownerAddress',
  'minterAddress',
  'createdOn',
  'lastUpdatedOn',
  0,
  'tokenAddress'
);
