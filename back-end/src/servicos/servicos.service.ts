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

  async update(id: number, updateServicoDto: UpdateServicoDto) {
    const existingServico = await this.prisma.tbCliente.findUnique({
      where: { id },
    });

    if (!existingServico) {
      return `Cliente #${id} não encontrado`;
    }

    // Atualiza os campos fornecidos no DTO
    const updatedServico = await this.prisma.tbServico.update({
      where: { id },
      data: updateServicoDto,
    });

    return updatedServico;
  }

  remove(id: number) {
    return `This action removes a #${id} servico`;
  }
}
