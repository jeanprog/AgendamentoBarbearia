/*
  Warnings:

  - Changed the type of `datCri` on the `tbsolicitacaoDesenv` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tbsolicitacaoDesenv" DROP COLUMN "datCri",
ADD COLUMN     "datCri" TIMESTAMP(3) NOT NULL;
