import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';


@Module({
  imports:[PrismaModule],
  controllers: [UserController],
  providers: [UserService , PrismaService],
})
export class UserModule {}
