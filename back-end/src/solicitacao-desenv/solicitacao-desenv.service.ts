import { Injectable } from '@nestjs/common';
import { CreateSolicitacaoDesenvDto } from './dto/create-solicitacao-desenv.dto';
import { UpdateSolicitacaoDesenvDto } from './dto/update-solicitacao-desenv.dto';
import { PrismaService } from './../database/prisma.service';

@Injectable()
export class SolicitacaoDesenvService {
  constructor(private prisma: PrismaService) {}

  async create(createSolicitacaoDesenvDto: CreateSolicitacaoDesenvDto) {
    const newSolicitacao = await this.prisma.tbsolicitacaoDesenv.create({
      data: createSolicitacaoDesenvDto,
    });
  }

  findAll() {
    return `This action returns all solicitacaoDesenv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitacaoDesenv`;
  }

  update(id: number, updateSolicitacaoDesenvDto: UpdateSolicitacaoDesenvDto) {
    return `This action updates a #${id} solicitacaoDesenv`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitacaoDesenv`;
  }
}
