-- CreateTable
CREATE TABLE `Payable` (
    `id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `emissionDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payable_value_key`(`value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assignor` (
    `id` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `payableId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assignor` ADD CONSTRAINT `Assignor_payableId_fkey` FOREIGN KEY (`payableId`) REFERENCES `Payable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
