/*
  Warnings:

  - You are about to drop the column `calendarWeek` on the `Order` table. All the data in the column will be lost.
  - Added the required column `dueMonth` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "calendarWeek",
ADD COLUMN     "dueMonth" TEXT NOT NULL;
