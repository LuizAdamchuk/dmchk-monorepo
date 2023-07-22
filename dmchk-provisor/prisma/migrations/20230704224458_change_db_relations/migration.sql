/*
  Warnings:

  - You are about to drop the column `payableId` on the `Assignor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Assignor` DROP FOREIGN KEY `Assignor_payableId_fkey`;

-- DropIndex
DROP INDEX `Payable_value_key` ON `Payable`;

-- AlterTable
ALTER TABLE `Assignor` DROP COLUMN `payableId`;

-- AlterTable
ALTER TABLE `Payable` ADD COLUMN `assignorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Payable` ADD CONSTRAINT `Payable_assignorId_fkey` FOREIGN KEY (`assignorId`) REFERENCES `Assignor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
