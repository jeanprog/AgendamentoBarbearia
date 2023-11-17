-- CreateTable
CREATE TABLE "tbCliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tbCliente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbCliente" ADD CONSTRAINT "tbCliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
