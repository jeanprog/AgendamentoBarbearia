import { Injectable } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ServicosService {
  constructor(private prisma: PrismaService) {}
  async create(createServicoDto: CreateServicoDto) {
    const newServico = await this.prisma.tbServico.create({
      data: createServicoDto,
    });
    return 'This action adds a new servico';
  }

  findAll() {
    return this.prisma.tbServico.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} servico`;
  }

  update(id: number, updateServicoDto: UpdateServicoDto) {
    return `This action updates a #${id} servico`;
  }

  remove(id: number) {
    return `This action removes a #${id} servico`;
  }
}
