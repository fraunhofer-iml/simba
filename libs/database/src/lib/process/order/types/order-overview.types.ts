/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Machine, Product, ServiceProcess, ServiceStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type OrderWithDependencies = {
  id: string;
  buyerOrderRefDocumentId: string | null;
  documentIssueDate: Date;
  vatCurrency: string;
  totalAmountWithoutVat: Decimal | null;
  orderLines: { item: Product; requestedQuantity: Decimal; netPrice: Decimal | null; unitOfMeasureCodeAgreed: string | null }[];
  serviceProcess:
    | (ServiceProcess & {
        states: ServiceStatus[];
        machineAssignments: {
          machine: Machine;
        }[];
        offers: { id: string }[];
        acceptedOffer: { id: string; basicPrice: Decimal; timeToProduction: Decimal; utilization: Decimal } | null;
        invoices:
          | {
              tradeReceivable: {
                id: string;
              } | null;
            }[]
          | null;
      })
    | null;
  buyer: { id: string; name: string };
  seller: { id: string; name: string };
};
