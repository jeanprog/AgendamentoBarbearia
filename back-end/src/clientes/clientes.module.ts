import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';
import { Module } from '@nestjs/common';
import { ClientesService } from './ClientesService';
import { ClientesController } from './clientes.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ClientesController],
  providers: [ClientesService , PrismaService],
})
export class ClientesModule {}
