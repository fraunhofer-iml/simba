/*
  Warnings:

  - The primary key for the `MachineAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "MachineAssignment" DROP CONSTRAINT "MachineAssignment_pkey",
ADD CONSTRAINT "MachineAssignment_pkey" PRIMARY KEY ("serviceProcessId", "machineId", "start");
