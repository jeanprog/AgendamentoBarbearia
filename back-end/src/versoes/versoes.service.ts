import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateVersoeDto } from './dto/create-versoe.dto';
import { UpdateVersoeDto } from './dto/update-versoe.dto';

@Injectable()
export class VersoesService {
  constructor(private prisma: PrismaService) {}

  create(createVersoeDto: CreateVersoeDto) {
    const newVersao = this.prisma.tbCadastroVersao.create({
      data: createVersoeDto,
    });

    console.log(newVersao);
    return newVersao;
  }

  findAll() {
    return this.prisma.tbCadastroVersao.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} versoe`;
  }

  async update(id: number, updateVersoeDto: UpdateVersoeDto) {
    const existVersao = await this.prisma.tbCadastroVersao.findUnique({
      where: { id },
    });

    if (!existVersao) {
      return `Versão não encontrada  #${id} não encontrado`;
    }

    // Atualiza os campos fornecidos no DTO
    const updatedVersao = await this.prisma.tbCadastroVersao.update({
      where: { id },
      data: updateVersoeDto,
    });

    return updateVersoeDto;
  }

  async remove(id: number) {
    const existVersao = await this.prisma.tbCadastroVersao.findUnique({
      where: { id },
    });

    if (!existVersao) {
      return `Versão não encontrada  #${id} não encontrado`;
    }

    const deleteVersao = await this.prisma.tbCadastroVersao.delete({
      where: { id },
    });

    return deleteVersao;
  }
}
