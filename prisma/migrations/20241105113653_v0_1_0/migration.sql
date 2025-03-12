/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

/*
  Warnings:

  - A unique constraint covering the columns `[serviceProcessId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "serviceProcessId" TEXT;

-- AlterTable
ALTER TABLE "ServiceProcess" ADD COLUMN     "scheduledDate" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_serviceProcessId_key" ON "Invoice"("serviceProcessId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_serviceProcessId_fkey" FOREIGN KEY ("serviceProcessId") REFERENCES "ServiceProcess"("id") ON DELETE SET NULL ON UPDATE CASCADE;
