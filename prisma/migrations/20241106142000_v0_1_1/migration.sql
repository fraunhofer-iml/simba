/*
  Warnings:

  - You are about to drop the `OrderStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderStatus" DROP CONSTRAINT "OrderStatus_orderId_fkey";

-- DropTable
DROP TABLE "OrderStatus";

-- CreateTable
CREATE TABLE "ServiceStatus" (
    "serviceProcessId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceStatus_pkey" PRIMARY KEY ("serviceProcessId","status")
);

-- AddForeignKey
ALTER TABLE "ServiceStatus" ADD CONSTRAINT "ServiceStatus_serviceProcessId_fkey" FOREIGN KEY ("serviceProcessId") REFERENCES "ServiceProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
