import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { PrismaModule } from './database/prisma.module';
import { UserLoginModule } from './user-login/user-login.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { ClientesModule } from './clientes/clientes.module';
import { ServicosModule } from './servicos/servicos.module';
import { ConfigLojaModule } from './config-loja/config-loja.module';
import { FiltersModule } from './filters/filters.module';
import { VersoesModule } from './versoes/versoes.module';







@Module({
  imports: [PrismaModule , UserModule, UserLoginModule, AuthUserModule, ClientesModule, ServicosModule, ConfigLojaModule, FiltersModule, VersoesModule  ], // Importe o PrismaModule
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
