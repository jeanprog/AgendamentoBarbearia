import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';
import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ServicosController],
  providers: [ServicosService, PrismaService],
})
export class ServicosModule {}
