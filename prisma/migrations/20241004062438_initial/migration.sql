-- CreateTable
CREATE TABLE `Flower` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flowerCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `deliveryDays` INTEGER NOT NULL,
    `purchaseQuantityUnit` INTEGER NOT NULL,
    `maintanableDays` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bouquet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bouquetCode` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BouquetComponent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bouquetId` INTEGER NOT NULL,
    `flowerId` INTEGER NOT NULL,
    `flowerQuantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierName` VARCHAR(191) NOT NULL,
    `orderedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveryAt` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrderDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseOrderId` INTEGER NOT NULL,
    `flowerId` INTEGER NOT NULL,
    `orderQuantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseOrderArrival` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseOrderId` INTEGER NOT NULL,
    `arrivedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PurchaseOrderArrival_purchaseOrderId_key`(`purchaseOrderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FlowerLot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseOrderArrivalId` INTEGER NOT NULL,
    `arrivalDate` DATE NOT NULL,
    `disposalDate` DATE NOT NULL,
    `lotSize` INTEGER NOT NULL,
    `flowerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `bouquetId` INTEGER NOT NULL,
    `deliveryDate` DATE NOT NULL,
    `deliveryAddress1` VARCHAR(191) NOT NULL,
    `deliveryAddress2` VARCHAR(191) NULL,
    `deliveryMessage` VARCHAR(191) NULL,
    `orderedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderShipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderId` INTEGER NOT NULL,
    `shippedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `SalesOrderShipment_salesOrderId_key`(`salesOrderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderShipmentDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderShipmentId` INTEGER NOT NULL,
    `flowerLotId` INTEGER NOT NULL,
    `shippedQuantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FlowerDisposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flowerLotId` INTEGER NOT NULL,
    `disposalQuantity` INTEGER NOT NULL,
    `disposedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BouquetComponent` ADD CONSTRAINT `BouquetComponent_bouquetId_fkey` FOREIGN KEY (`bouquetId`) REFERENCES `Bouquet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BouquetComponent` ADD CONSTRAINT `BouquetComponent_flowerId_fkey` FOREIGN KEY (`flowerId`) REFERENCES `Flower`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderDetail` ADD CONSTRAINT `PurchaseOrderDetail_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderDetail` ADD CONSTRAINT `PurchaseOrderDetail_flowerId_fkey` FOREIGN KEY (`flowerId`) REFERENCES `Flower`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseOrderArrival` ADD CONSTRAINT `PurchaseOrderArrival_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FlowerLot` ADD CONSTRAINT `FlowerLot_purchaseOrderArrivalId_fkey` FOREIGN KEY (`purchaseOrderArrivalId`) REFERENCES `PurchaseOrderArrival`(`purchaseOrderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FlowerLot` ADD CONSTRAINT `FlowerLot_flowerId_fkey` FOREIGN KEY (`flowerId`) REFERENCES `Flower`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_bouquetId_fkey` FOREIGN KEY (`bouquetId`) REFERENCES `Bouquet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderShipment` ADD CONSTRAINT `SalesOrderShipment_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderShipmentDetail` ADD CONSTRAINT `SalesOrderShipmentDetail_salesOrderShipmentId_fkey` FOREIGN KEY (`salesOrderShipmentId`) REFERENCES `SalesOrderShipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderShipmentDetail` ADD CONSTRAINT `SalesOrderShipmentDetail_flowerLotId_fkey` FOREIGN KEY (`flowerLotId`) REFERENCES `FlowerLot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FlowerDisposal` ADD CONSTRAINT `FlowerDisposal_flowerLotId_fkey` FOREIGN KEY (`flowerLotId`) REFERENCES `FlowerLot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
