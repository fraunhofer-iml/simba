-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minimalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "vatId" TEXT NOT NULL,
    "commercialRegisterNumber" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contractCurrency" TEXT NOT NULL,
    "measuringUnit" TEXT NOT NULL,
    "netPricePerUnit" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "debitorId" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeReceivable" (
    "id" TEXT NOT NULL,
    "nft" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DOUBLE PRECISION NOT NULL,
    "debitorId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "TradeReceivable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "calendarWeek" TEXT NOT NULL,
    "offers" TEXT[],
    "machines" TEXT[],
    "productId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "offerId" TEXT,
    "tradeReceivableId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_debitorId_fkey" FOREIGN KEY ("debitorId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeReceivable" ADD CONSTRAINT "TradeReceivable_debitorId_fkey" FOREIGN KEY ("debitorId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeReceivable" ADD CONSTRAINT "TradeReceivable_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tradeReceivableId_fkey" FOREIGN KEY ("tradeReceivableId") REFERENCES "TradeReceivable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
