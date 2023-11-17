
import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.auth';
import { PasswordService } from './password.service';


@Module({
  imports: [PrismaModule,   PassportModule,
    JwtModule],
  controllers: [AuthUserController],
  providers: [AuthUserService, PrismaService, JwtService , LocalStrategy, PasswordService],
})
export class AuthUserModule {}
