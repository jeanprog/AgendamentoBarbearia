import { PrismaService } from './../database/prisma.service';
import { PrismaModule } from './../database/prisma.module';
import { Module } from '@nestjs/common';
import { SolucaoVersaoService } from './solucao-versao.service';
import { SolucaoVersaoController } from './solucao-versao.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SolucaoVersaoController],
  providers: [SolucaoVersaoService, PrismaService],
})
export class SolucaoVersaoModule {}
