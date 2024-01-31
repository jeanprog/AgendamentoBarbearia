/*
  Warnings:

  - Added the required column `statusChamadoAtual` to the `tbChamado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbChamado" ADD COLUMN     "statusChamadoAtual" INTEGER NOT NULL;
