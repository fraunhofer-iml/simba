/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `TradeReceivable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TradeReceivable" DROP CONSTRAINT "TradeReceivable_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TradeReceivable" ALTER COLUMN "invoiceId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TradeReceivable_invoiceId_key" ON "TradeReceivable"("invoiceId");

-- AddForeignKey
ALTER TABLE "TradeReceivable" ADD CONSTRAINT "TradeReceivable_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
