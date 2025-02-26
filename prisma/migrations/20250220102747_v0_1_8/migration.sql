/*
  Warnings:

  - You are about to drop the column `scheduledDate` on the `Offer` table. All the data in the column will be lost.
  - The primary key for the `PaymentStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "scheduledDate",
ADD COLUMN     "plannedCalendarWeek" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "PaymentStatus" DROP CONSTRAINT "PaymentStatus_pkey",
ADD CONSTRAINT "PaymentStatus_pkey" PRIMARY KEY ("tradeReceivableId", "timestamp", "status");
