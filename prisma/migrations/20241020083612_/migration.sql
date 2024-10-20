/*
  Warnings:

  - You are about to drop the column `bouquetCode` on the `Bouquet` table. All the data in the column will be lost.
  - You are about to drop the column `flowerCode` on the `Flower` table. All the data in the column will be lost.
  - You are about to drop the column `maintanableDays` on the `Flower` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseQuantityUnit` on the `Flower` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryAt` on the `PurchaseOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Flower` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Bouquet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintainableDays` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseUnit` to the `Flower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryDate` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bouquet` DROP COLUMN `bouquetCode`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Flower` DROP COLUMN `flowerCode`,
    DROP COLUMN `maintanableDays`,
    DROP COLUMN `purchaseQuantityUnit`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `maintainableDays` INTEGER NOT NULL,
    ADD COLUMN `purchaseUnit` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PurchaseOrder` DROP COLUMN `deliveryAt`,
    ADD COLUMN `deliveryDate` DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Flower_code_key` ON `Flower`(`code`);
