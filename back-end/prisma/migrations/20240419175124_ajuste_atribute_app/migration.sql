/*
  Warnings:

  - You are about to drop the column `aplicativoVersao` on the `tbsolicitacaoDesenv` table. All the data in the column will be lost.
  - Added the required column `aplicativo` to the `tbsolicitacaoDesenv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbsolicitacaoDesenv" DROP COLUMN "aplicativoVersao",
ADD COLUMN     "aplicativo" TEXT NOT NULL;
