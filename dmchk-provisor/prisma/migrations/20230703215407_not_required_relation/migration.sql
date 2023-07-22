-- DropForeignKey
ALTER TABLE `Assignor` DROP FOREIGN KEY `Assignor_payableId_fkey`;

-- AlterTable
ALTER TABLE `Assignor` MODIFY `payableId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Assignor` ADD CONSTRAINT `Assignor_payableId_fkey` FOREIGN KEY (`payableId`) REFERENCES `Payable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
