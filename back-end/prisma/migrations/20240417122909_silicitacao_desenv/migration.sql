/*
  Warnings:

  - Added the required column `datCri` to the `tbsolicitacaoDesenv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `tbsolicitacaoDesenv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbsolicitacaoDesenv" ADD COLUMN     "datCri" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;
