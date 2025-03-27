-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decisionDate" TIMESTAMP(3),
    "plannedCalendarWeek" DECIMAL(65,30) NOT NULL,
    "plannedYear" DECIMAL(65,30) NOT NULL,
    "price" MONEY NOT NULL,
    "status" TEXT NOT NULL,
    "serviceProcessId" TEXT NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "variant" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "cppsId" TEXT,
    "description" TEXT NOT NULL,
    "minimalPrice" MONEY NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contractCurrency" TEXT NOT NULL,
    "measuringUnit" TEXT NOT NULL,
    "netPricePerUnit" TEXT NOT NULL,
    "totalAmountWithoutVat" MONEY NOT NULL,
    "vat" MONEY NOT NULL,
    "url" TEXT NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "serviceProcessId" TEXT,
    "debtorId" TEXT,
    "creditorId" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeReceivable" (
    "id" TEXT NOT NULL,
    "nft" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "TradeReceivable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentStatus" (
    "tradeReceivableId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentStatus_pkey" PRIMARY KEY ("tradeReceivableId","timestamp","status")
);

-- CreateTable
CREATE TABLE "ServiceProcess" (
    "id" TEXT NOT NULL,
    "dueCalendarWeek" INTEGER NOT NULL,
    "dueYear" INTEGER NOT NULL,
    "scheduledDate" TIMESTAMP(3),
    "orderId" TEXT,
    "acceptedOfferId" TEXT,

    CONSTRAINT "ServiceProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "documentIssueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noteContent" TEXT,
    "referencedBuyerOrderLine" TEXT,
    "buyerOrderRefDocumentId" TEXT,
    "sumOfLinesAmount" INTEGER,
    "totalAmountWithoutVat" MONEY,
    "vatCurrency" TEXT NOT NULL,
    "buyerAccountingRefId" TEXT,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "ServiceStatus" (
    "serviceProcessId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceStatus_pkey" PRIMARY KEY ("serviceProcessId","status")
);

-- CreateTable
CREATE TABLE "MachineAssignment" (
    "serviceProcessId" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MachineAssignment_pkey" PRIMARY KEY ("serviceProcessId","machineId","start")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeReceivable_invoiceId_key" ON "TradeReceivable"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProcess_orderId_key" ON "ServiceProcess"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProcess_acceptedOfferId_key" ON "ServiceProcess"("acceptedOfferId");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_serviceProcessId_fkey" FOREIGN KEY ("serviceProcessId") REFERENCES "ServiceProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInformation" ADD CONSTRAINT "PaymentInformation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_serviceProcessId_fkey" FOREIGN KEY ("serviceProcessId") REFERENCES "ServiceProcess"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "ServiceStatus" ADD CONSTRAINT "ServiceStatus_serviceProcessId_fkey" FOREIGN KEY ("serviceProcessId") REFERENCES "ServiceProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineAssignment" ADD CONSTRAINT "MachineAssignment_serviceProcessId_fkey" FOREIGN KEY ("serviceProcessId") REFERENCES "ServiceProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineAssignment" ADD CONSTRAINT "MachineAssignment_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
