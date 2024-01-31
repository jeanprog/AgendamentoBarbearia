/*
  Warnings:

  - The primary key for the `tbLogin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `tbLogin` table. All the data in the column will be lost.
  - You are about to drop the `tbAgendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbBarbearia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbServico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cargo` to the `tbLogin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbAgendamento" DROP CONSTRAINT "tbAgendamento_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "tbAgendamento" DROP CONSTRAINT "tbAgendamento_servicoId_fkey";

-- DropForeignKey
ALTER TABLE "tbAgendamento" DROP CONSTRAINT "tbAgendamento_userId_fkey";

-- DropForeignKey
ALTER TABLE "tbBarbearia" DROP CONSTRAINT "tbBarbearia_userId_fkey";

-- DropForeignKey
ALTER TABLE "tbCliente" DROP CONSTRAINT "tbCliente_userId_fkey";

-- DropForeignKey
ALTER TABLE "tbLogin" DROP CONSTRAINT "tbLogin_userId_fkey";

-- AlterTable
ALTER TABLE "tbLogin" DROP CONSTRAINT "tbLogin_pkey",
DROP COLUMN "userId",
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD COLUMN     "cargo" TEXT NOT NULL,
ADD CONSTRAINT "tbLogin_pkey" PRIMARY KEY ("Id");

-- DropTable
DROP TABLE "tbAgendamento";

-- DropTable
DROP TABLE "tbBarbearia";

-- DropTable
DROP TABLE "tbServico";

-- DropTable
DROP TABLE "tbUser";

-- CreateTable
CREATE TABLE "tbRede" (
    "id" SERIAL NOT NULL,
    "nameRede" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "situacao" TEXT NOT NULL DEFAULT 'A',

    CONSTRAINT "tbRede_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbLogin" ADD CONSTRAINT "tbLogin_Id_fkey" FOREIGN KEY ("Id") REFERENCES "tbRede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbCliente" ADD CONSTRAINT "tbCliente_id_fkey" FOREIGN KEY ("id") REFERENCES "tbRede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
