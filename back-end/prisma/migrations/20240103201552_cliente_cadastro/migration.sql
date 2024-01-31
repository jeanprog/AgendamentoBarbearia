/*
  Warnings:

  - Added the required column `empresa` to the `tbCliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbCliente" ADD COLUMN     "empresa" TEXT NOT NULL;
