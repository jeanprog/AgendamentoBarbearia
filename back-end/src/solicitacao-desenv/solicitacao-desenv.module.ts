import { PrismaService } from './../database/prisma.service';
import { PrismaModule } from './../database/prisma.module';
import { Module } from '@nestjs/common';
import { SolicitacaoDesenvService } from './solicitacao-desenv.service';
import { SolicitacaoDesenvController } from './solicitacao-desenv.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SolicitacaoDesenvController],
  providers: [SolicitacaoDesenvService, PrismaService],
})
export class SolicitacaoDesenvModule {}
