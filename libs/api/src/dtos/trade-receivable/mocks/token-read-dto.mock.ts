/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TokenAssetDto, TokenHierarchyDto, TokenMetadataDto, TokenReadDto } from 'nft-folder-blockchain-connector-besu';

export const TokenReadDtoMock: TokenReadDto = new TokenReadDto(
  'INV-20241012-1',
  new TokenAssetDto('INV_INV-20241012-1.pdf', 'b28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a21'),
  new TokenMetadataDto('METADATA_sp001.json', 'dfb95c68429c22041014e3eb9da9d74bf72ce08d96123861b2d6263074ceac65'),
  "{\"serviceProcessId\":\"sp001\",\"serviceProcessHash\":\"a71fe6f6ba01a16c83d7fea369a3bb828bd24f7da6e2eb4c2449aa91dbc44b1e\",\"status\":\"open\"}",
  new TokenHierarchyDto(false, [], []),
  '0x72e37d393c70823113a7176aC1F7C579d2C5623E',
  '0x72e37d393c70823113a7176aC1F7C579d2C5623E',
  '2024-10-12T00:00:00.000Z',
  '2024-11-12T00:00:00.000Z',
  0,
  '0x2B2f78c5BF6D9C12Ee1225D5F374aa91204580c3'
);
