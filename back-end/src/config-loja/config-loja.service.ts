import { Injectable } from '@nestjs/common';
import { CreateConfigLojaDto } from './dto/create-config-loja.dto';
import { UpdateConfigLojaDto } from './dto/update-config-loja.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ConfigLojaService {
  constructor(private prisma: PrismaService) {}
  async create(createConfigLojaDto: CreateConfigLojaDto) {
    const novaBarbearia = await this.prisma.tbBarbearia.create({
      data: createConfigLojaDto,
    });
    return 'This action adds a new configLoja';
  }

  findAll() {
    return `This action returns all configLoja`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configLoja`;
  }

  update(id: number, updateConfigLojaDto: UpdateConfigLojaDto) {
    return `This action updates a #${id} configLoja`;
  }

  remove(id: number) {
    return `This action removes a #${id} configLoja`;
  }
}
