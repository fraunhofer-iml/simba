/*
  Warnings:

  - You are about to drop the column `machines` on the `ServiceProcess` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceProcess" DROP COLUMN "machines";

-- CreateTable
CREATE TABLE "MachineAssignment" (
    "serviceProcessId" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MachineAssignment_pkey" PRIMARY KEY ("serviceProcessId","machineId")
);

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineAssignment" ADD CONSTRAINT "MachineAssignment_serviceProcessId_fkey" FOREIGN KEY ("serviceProcessId") REFERENCES "ServiceProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineAssignment" ADD CONSTRAINT "MachineAssignment_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
