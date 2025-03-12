/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

/*
  Warnings:

  - Made the column `invoiceId` on table `TradeReceivable` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TradeReceivable" DROP CONSTRAINT "TradeReceivable_invoiceId_fkey";

-- AlterTable
ALTER TABLE "TradeReceivable" ALTER COLUMN "invoiceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TradeReceivable" ADD CONSTRAINT "TradeReceivable_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
