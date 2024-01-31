import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    /*   const newUser = await this.prisma.tbUser.create({
      data: createUserDto
    }); */

    return 'Status 200 ok salvo com sucesso ';
  }

  allUsers() {
    return this.prisma.tbRede.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.tbRede.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return `User with ID #${id} não foi encontrado`;
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
