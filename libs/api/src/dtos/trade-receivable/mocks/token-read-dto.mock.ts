/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TokenAssetDto, TokenHierarchyDto, TokenMetadataDto, TokenReadDto } from 'nft-folder-blockchain-connector';

export const TokenReadDtoMock: TokenReadDto = new TokenReadDto(
  'remoteId',
  new TokenAssetDto('assetUri', 'assetHash'),
  new TokenMetadataDto('metadataUri', 'metadataHash'),
  "{\"serviceProcessId\":\"sp001\",\"serviceProcessHash\":\"b614c49f21dfd1525dee019f62d1a273993e466fc875cffe1332244b56ac4502\",\"status\":\"Open\"}",
  new TokenHierarchyDto(true, [], []),
  'ownerAddress',
  'minterAddress',
  'createdOn',
  'lastUpdatedOn',
  0,
  'tokenAddress'
);
