/*
  Warnings:

  - Added the required column `dia` to the `tbAgendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tbAgendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbAgendamento" ADD COLUMN     "dia" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "disponivel" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
