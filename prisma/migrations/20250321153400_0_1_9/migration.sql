/*
  Warnings:

  - Added the required column `plannedYear` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Made the column `plannedCalendarWeek` on table `Offer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "plannedYear" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "plannedCalendarWeek" SET NOT NULL;
