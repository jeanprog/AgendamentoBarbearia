import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSolucaoVersaoDto } from './dto/create-solucao-versao.dto';
import { UpdateSolucaoVersaoDto } from './dto/update-solucao-versao.dto';


@Injectable()
export class SolucaoVersaoService {
  constructor(private prisma: PrismaService) {}

  async create(createSolucaoVersaoDto: CreateSolucaoVersaoDto) {
    const newSolicitacao = await this.prisma.tbsolucaoVersao.create({
      data: createSolucaoVersaoDto,
    });
  }

  findAll() {
    return `This action returns all solucaoVersao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solucaoVersao`;
  }

  update(id: number, updateSolucaoVersaoDto: UpdateSolucaoVersaoDto) {
    return `This action updates a #${id} solucaoVersao`;
  }

  remove(id: number) {
    return `This action removes a #${id} solucaoVersao`;
  }
}
