import { Injectable } from '@nestjs/common';
import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { PrismaService } from '../database/prisma.service';
import { PasswordService } from 'src/auth-user/password.service';

@Injectable()
export class UserLoginService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}
  async create(createUserLoginDto: CreateUserLoginDto) {
    const { password, ...otherUserProps } = createUserLoginDto;

    // Hash the password before saving it
    const hashedPassword = await this.passwordService.hashPassword(password);

    // Create the user with the hashed password
    const newLogin = await this.prisma.tbLogin.create({
      data: {
        ...otherUserProps,
        password: hashedPassword,
      },
    });

    return `Usuario adicionado com sucesso - 200 OK`;
  }

  findAll() {
    return this.prisma.tbLogin.findMany({
      select: {
        Id: true,
        nameUser: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userLogin`;
  }

  update(id: number, updateUserLoginDto: UpdateUserLoginDto) {
    return `This action updates a #${id} userLogin`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLogin`;
  }
}
