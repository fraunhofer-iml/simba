/*
  Warnings:

  - The primary key for the `Invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `acceptedByOrderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `calendarWeek` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `completionDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `machines` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `participantId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tradeReceivableId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `TradeReceivable` table. All the data in the column will be lost.
  - You are about to drop the column `debtorId` on the `TradeReceivable` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `TradeReceivable` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TradeReceivable` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `TradeReceivable` table. All the data in the column will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `Invoice` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `totalAmountWithoutVat` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `vat` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `minimalPrice` on the `Machine` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `serviceProcessId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Offer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `buyerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_debtorId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_acceptedByOrderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_participantId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "TradeReceivable" DROP CONSTRAINT "TradeReceivable_debtorId_fkey";

-- DropForeignKey
ALTER TABLE "TradeReceivable" DROP CONSTRAINT "TradeReceivable_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "TradeReceivable" DROP CONSTRAINT "TradeReceivable_orderId_fkey";

-- DropIndex
DROP INDEX "Order_acceptedByOrderId_key";

-- DropIndex
DROP INDEX "Order_tradeReceivableId_key";

-- DropIndex
DROP INDEX "TradeReceivable_orderId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pkey",
DROP COLUMN "amount",
DROP COLUMN "status",
ADD COLUMN     "creditorId" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "totalAmountWithoutVat" MONEY NOT NULL,
DROP COLUMN "vat",
ADD COLUMN     "vat" MONEY NOT NULL,
ALTER COLUMN "debtorId" DROP NOT NULL,
ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "cppsId" TEXT,
DROP COLUMN "minimalPrice",
ADD COLUMN     "minimalPrice" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "orderId",
ADD COLUMN     "decisionDate" TIMESTAMP(3),
ADD COLUMN     "scheduledDate" TIMESTAMP(3),
ADD COLUMN     "serviceProcessId" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "acceptedByOrderId",
DROP COLUMN "amount",
DROP COLUMN "calendarWeek",
DROP COLUMN "completionDate",
DROP COLUMN "creationDate",
DROP COLUMN "machines",
DROP COLUMN "participantId",
DROP COLUMN "productId",
DROP COLUMN "status",
DROP COLUMN "tradeReceivableId",
DROP COLUMN "year",
ADD COLUMN     "buyerAccountingRefId" TEXT,
ADD COLUMN     "buyerId" TEXT NOT NULL,
ADD COLUMN     "buyerOrderRefDocumentId" TEXT,
ADD COLUMN     "documentIssueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "noteContent" TEXT,
ADD COLUMN     "referencedBuyerOrderLine" TEXT,
ADD COLUMN     "sellerId" TEXT NOT NULL,
ADD COLUMN     "sumOfLinesAmount" INTEGER,
ADD COLUMN     "totalAmountWithoutVat" MONEY,
ADD COLUMN     "vatCurrency" TEXT;

-- AlterTable
ALTER TABLE "TradeReceivable" DROP COLUMN "creationDate",
DROP COLUMN "debtorId",
DROP COLUMN "orderId",
DROP COLUMN "status",
DROP COLUMN "value";

-- DropTable
DROP TABLE "Participant";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "vatId" TEXT NOT NULL,
    "commercialRegisterNumber" TEXT NOT NULL,
    "telephone" TEXT,
    "emailAddress" TEXT,
    "electronicAddress" TEXT,
    "electronicAddressSchemeId" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentInformation" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "IBAN" TEXT NOT NULL,
    "BIC" TEXT NOT NULL,

    CONSTRAINT "PaymentInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentStatus" (
    "tradeReceivableId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentStatus_pkey" PRIMARY KEY ("tradeReceivableId","status")
);

-- CreateTable
CREATE TABLE "ServiceProcess" (
    "id" TEXT NOT NULL,
    "dueCalendarWeek" INTEGER NOT NULL,
    "dueYear" INTEGER NOT NULL,
    "orderId" TEXT,
    "machines" TEXT[],
    "acceptedOfferId" TEXT,

    CONSTRAINT "ServiceProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLine" (
    "id" TEXT NOT NULL,
    "netPrice" MONEY,
    "partialDeliveryAllowed" BOOLEAN,
    "requestedQuantity" DECIMAL(65,30) NOT NULL,
    "unitOfMeasureCodeRequested" TEXT,
    "unitOfMeasureCodeAgreed" TEXT,
    "lineTotalAmount" MONEY,
    "orderId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "OrderLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatus" (
    "orderId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderStatus_pkey" PRIMARY KEY ("orderId","status")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProcess_orderId_key" ON "ServiceProcess"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProcess_acceptedOfferId_key" ON "ServiceProcess"("acceptedOfferId");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_serviceProcessId_fkey" FOREIGN KEY ("serviceProcessId") REFERENCES "ServiceProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInformation" ADD CONSTRAINT "PaymentInformation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_debtorId_fkey" FOREIGN KEY ("debtorId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_creditorId_fkey" FOREIGN KEY ("creditorId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeReceivable" ADD CONSTRAINT "TradeReceivable_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentStatus" ADD CONSTRAINT "PaymentStatus_tradeReceivableId_fkey" FOREIGN KEY ("tradeReceivableId") REFERENCES "TradeReceivable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceProcess" ADD CONSTRAINT "ServiceProcess_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceProcess" ADD CONSTRAINT "ServiceProcess_acceptedOfferId_fkey" FOREIGN KEY ("acceptedOfferId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderStatus" ADD CONSTRAINT "OrderStatus_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
