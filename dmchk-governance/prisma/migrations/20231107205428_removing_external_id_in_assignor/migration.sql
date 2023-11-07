/*
  Warnings:

  - You are about to drop the column `externalId` on the `Assignor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Assignor_externalId_key` ON `Assignor`;

-- AlterTable
ALTER TABLE `Assignor` DROP COLUMN `externalId`;
