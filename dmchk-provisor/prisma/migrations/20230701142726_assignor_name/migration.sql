/*
  Warnings:

  - Added the required column `name` to the `Assignor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Assignor` ADD COLUMN `name` VARCHAR(191) NOT NULL;
