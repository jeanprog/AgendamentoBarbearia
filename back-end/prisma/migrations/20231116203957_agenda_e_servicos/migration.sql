-- CreateTable
CREATE TABLE "tbServico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "tbServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbAgendamento" (
    "id" SERIAL NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "tbAgendamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "tbServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "tbCliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
