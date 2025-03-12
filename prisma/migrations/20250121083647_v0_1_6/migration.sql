/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

/*
  Warnings:

  - The primary key for the `MachineAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "MachineAssignment" DROP CONSTRAINT "MachineAssignment_pkey",
ADD CONSTRAINT "MachineAssignment_pkey" PRIMARY KEY ("serviceProcessId", "machineId", "start");
