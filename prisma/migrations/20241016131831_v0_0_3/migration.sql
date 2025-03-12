/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

/*
  Warnings:

  - You are about to drop the column `dueMonth` on the `Order` table. All the data in the column will be lost.
  - Added the required column `calendarWeek` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dueMonth",
ADD COLUMN     "calendarWeek" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
