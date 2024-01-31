-- CreateTable
CREATE TABLE "tbStatusChamado" (
    "id" SERIAL NOT NULL,
    "chamadoId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "dataAlteracao" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "tbStatusChamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbChamado" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "sistema" TEXT NOT NULL,
    "dAbertura" TIMESTAMP(3) NOT NULL,
    "dFechamento" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "redeId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "tbChamado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbStatusChamado" ADD CONSTRAINT "tbStatusChamado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "tbLogin"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbStatusChamado" ADD CONSTRAINT "tbStatusChamado_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "tbChamado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbChamado" ADD CONSTRAINT "tbChamado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "tbLogin"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbChamado" ADD CONSTRAINT "tbChamado_redeId_fkey" FOREIGN KEY ("redeId") REFERENCES "tbRede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbChamado" ADD CONSTRAINT "tbChamado_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "tbCliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
