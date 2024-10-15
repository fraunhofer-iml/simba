/*
  Warnings:

  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `debitorId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `debitorId` on the `TradeReceivable` table. All the data in the column will be lost.
  - Added the required column `debtorId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debtorId` to the `TradeReceivable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_debitorId_fkey";

-- DropForeignKey
ALTER TABLE "TradeReceivable" DROP CONSTRAINT "TradeReceivable_debitorId_fkey";

-- DropForeignKey
ALTER TABLE "TradeReceivable" DROP CONSTRAINT "TradeReceivable_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
DROP COLUMN "debitorId",
DROP COLUMN "id",
ADD COLUMN     "debtorId" TEXT NOT NULL,
ADD COLUMN     "invoiceNumber" TEXT NOT NULL,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoiceNumber");

-- AlterTable
ALTER TABLE "TradeReceivable" DROP COLUMN "debitorId",
ADD COLUMN     "debtorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_debtorId_fkey" FOREIGN KEY ("debtorId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeReceivable" ADD CONSTRAINT "TradeReceivable_debtorId_fkey" FOREIGN KEY ("debtorId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeReceivable" ADD CONSTRAINT "TradeReceivable_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("invoiceNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
