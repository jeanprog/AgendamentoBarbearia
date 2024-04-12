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
    return 'Versão adicionada com sucesso';
  }

  findAll() {
    return this.prisma.tbCadastroVersao.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} versoe`;
  }

  update(id: number, updateVersoeDto: UpdateVersoeDto) {
    return `This action updates a #${id} versoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} versoe`;
  }
}
