/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum TradeReceivableMessagePatterns {
  CREATE = 'trade-receivables/create',
  CREATE_NFT = 'trade-receivables/nft/create',
  UPDATE_NFT = 'trade-receivables/nft/update',
  READ_BY_ID = 'trade-receivables/nft/read-by-id',
  READ_ALL = 'trade-receivables/nft/read-all'
}
