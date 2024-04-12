import { VersoesService } from './versoes.service';
import { VersoesController } from './versoes.controller';
import { PrismaService } from './../database/prisma.service';

import { PrismaModule } from 'src/database/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [VersoesController],
  providers: [VersoesService, PrismaService],
})
export class VersoesModule {}
