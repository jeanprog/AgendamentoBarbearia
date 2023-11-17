import { Module } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { UserLoginController } from './user-login.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';
import { PasswordService } from 'src/auth-user/password.service';

@Module({
  imports:[PrismaModule],
  controllers: [UserLoginController],
  providers: [UserLoginService ,  PrismaService, PasswordService],
})
export class UserLoginModule {}
