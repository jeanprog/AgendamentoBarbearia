-- AddForeignKey
ALTER TABLE "tbStatusChamado" ADD CONSTRAINT "tbStatusChamado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "tbLogin"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
