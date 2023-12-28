-- AlterTable
ALTER TABLE "tbUser" ADD COLUMN     "situacao" TEXT NOT NULL DEFAULT 'A';

-- CreateTable
CREATE TABLE "tbBarbearia" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "diasAbertos" INTEGER[],
    "horarioAbertura" TIMESTAMP(3) NOT NULL,
    "horarioFechamento" TIMESTAMP(3) NOT NULL,
    "situacao" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tbBarbearia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbBarbearia" ADD CONSTRAINT "tbBarbearia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
