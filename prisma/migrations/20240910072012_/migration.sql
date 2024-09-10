/*
  Warnings:

  - You are about to drop the column `offerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `offers` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[acceptedByOrderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tradeReceivableId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `TradeReceivable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `TradeReceivable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_offerId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_tradeReceivableId_fkey";

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "orderId" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "offerId",
DROP COLUMN "offers",
ADD COLUMN     "acceptedByOrderId" TEXT;

-- AlterTable
ALTER TABLE "TradeReceivable" ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_acceptedByOrderId_key" ON "Order"("acceptedByOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_tradeReceivableId_key" ON "Order"("tradeReceivableId");

-- CreateIndex
CREATE UNIQUE INDEX "TradeReceivable_orderId_key" ON "TradeReceivable"("orderId");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeReceivable" ADD CONSTRAINT "TradeReceivable_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_acceptedByOrderId_fkey" FOREIGN KEY ("acceptedByOrderId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
