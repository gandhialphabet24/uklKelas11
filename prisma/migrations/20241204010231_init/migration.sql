/*
  Warnings:

  - You are about to drop the column `nama` on the `user` table. All the data in the column will be lost.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `nama`,
    ADD COLUMN `userName` TEXT NOT NULL;
