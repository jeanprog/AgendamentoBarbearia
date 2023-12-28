import { PrismaModule } from './../database/prisma.module';
import { PrismaService } from './../database/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigLojaService } from './config-loja.service';
import { ConfigLojaController } from './config-loja.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ConfigLojaController],
  providers: [ConfigLojaService, PrismaService],
})
export class ConfigLojaModule {}
