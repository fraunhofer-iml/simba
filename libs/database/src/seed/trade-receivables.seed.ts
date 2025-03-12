/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TradeReceivable } from '@prisma/client';
import { InvoiceSeed } from './invoices.seed';

export const TradeReceivablesSeed = <TradeReceivable[]>[
  {
    id: 'TR001',
    nft: 'AEF3122355213EFA1',
    invoiceId: InvoiceSeed[0].id,
  },
  {
    id: 'TR002',
    nft: 'AEF3122355213EFA2',
    invoiceId: InvoiceSeed[1].id,
  },
  {
    id: 'TR003',
    nft: 'AEF3122355213EFA3',
    invoiceId: InvoiceSeed[2].id,
  },
  {
    id: 'TR004',
    nft: 'AEF3122355213EFA4',
    invoiceId: InvoiceSeed[3].id,
  },

  {
    id: 'TR005',
    nft: 'AEF3122355213EFA5',
    invoiceId: InvoiceSeed[4].id,
  },
  {
    id: 'TR006',
    nft: 'AEF3122355213EFA6',
    invoiceId: InvoiceSeed[5].id,
  },
  {
    id: 'TR007',
    nft: 'AEF3122355213EFA7',
    invoiceId: InvoiceSeed[6].id,
  },
  {
    id: 'TR008',
    nft: 'AEF3122355213EFA8',
    invoiceId: InvoiceSeed[7].id,
  },
  {
    id: 'TR009',
    nft: 'AEF3122355213EFA9',
    invoiceId: InvoiceSeed[8].id,
  },
];
