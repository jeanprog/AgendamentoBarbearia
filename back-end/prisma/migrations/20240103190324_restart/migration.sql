/*
  Warnings:

  - You are about to drop the column `userId` on the `tbCliente` table. All the data in the column will be lost.
  - Added the required column `redeId` to the `tbCliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redeId` to the `tbLogin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbCliente" DROP CONSTRAINT "tbCliente_id_fkey";

-- DropForeignKey
ALTER TABLE "tbLogin" DROP CONSTRAINT "tbLogin_Id_fkey";

-- AlterTable
ALTER TABLE "tbCliente" DROP COLUMN "userId",
ADD COLUMN     "redeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tbLogin" ADD COLUMN     "redeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tbLogin" ADD CONSTRAINT "tbLogin_redeId_fkey" FOREIGN KEY ("redeId") REFERENCES "tbRede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbCliente" ADD CONSTRAINT "tbCliente_redeId_fkey" FOREIGN KEY ("redeId") REFERENCES "tbRede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
