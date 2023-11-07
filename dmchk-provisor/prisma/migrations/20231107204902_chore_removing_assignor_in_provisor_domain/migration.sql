/*
  Warnings:

  - You are about to drop the `Assignor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Payable` DROP FOREIGN KEY `Payable_assignorId_fkey`;

-- DropTable
DROP TABLE `Assignor`;
