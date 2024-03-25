-- CreateTable
CREATE TABLE "tbCadastroVersao" (
    "id" SERIAL NOT NULL,
    "aplicativo" TEXT NOT NULL,
    "versao" TEXT NOT NULL,
    "datCri" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbCadastroVersao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbsolicitacaoDesenv" (
    "id" SERIAL NOT NULL,
    "idVersao" INTEGER NOT NULL,
    "aplicativoVersao" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "desenvolvedor" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "tbsolicitacaoDesenv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbsolucaoVersao" (
    "id" SERIAL NOT NULL,
    "idVersao" INTEGER NOT NULL,
    "idsolicitacaoDesenv" INTEGER NOT NULL,
    "descricaoSolucao" TEXT NOT NULL,
    "datCri" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbsolucaoVersao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbhistoricosolicitacao" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "idSolicitacao" INTEGER NOT NULL,
    "observacao" TEXT NOT NULL,
    "dataCri" TIMESTAMP(3) NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "tbhistoricosolicitacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbsolicitacaoDesenv" ADD CONSTRAINT "tbsolicitacaoDesenv_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "tbLogin"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsolicitacaoDesenv" ADD CONSTRAINT "tbsolicitacaoDesenv_idVersao_fkey" FOREIGN KEY ("idVersao") REFERENCES "tbCadastroVersao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsolucaoVersao" ADD CONSTRAINT "tbsolucaoVersao_idVersao_fkey" FOREIGN KEY ("idVersao") REFERENCES "tbCadastroVersao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsolucaoVersao" ADD CONSTRAINT "tbsolucaoVersao_idsolicitacaoDesenv_fkey" FOREIGN KEY ("idsolicitacaoDesenv") REFERENCES "tbsolicitacaoDesenv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbhistoricosolicitacao" ADD CONSTRAINT "tbhistoricosolicitacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "tbLogin"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbhistoricosolicitacao" ADD CONSTRAINT "tbhistoricosolicitacao_idSolicitacao_fkey" FOREIGN KEY ("idSolicitacao") REFERENCES "tbsolicitacaoDesenv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
