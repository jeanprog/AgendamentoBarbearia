import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChamadoDto } from './dto/create-servico.dto';
import { StatusChamadoDTO } from './dto/create-status-chamado.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ServicosService {
  constructor(private prisma: PrismaService) {}

  private createStatusData(
    chamadoData: CreateChamadoDto,
    novoChamadoId: number,
  ): { data: StatusChamadoDTO } {
    return {
      data: {
        status: chamadoData.statusChamadoAtual,
        dataAlteracao: new Date(),
        usuarioId: chamadoData.usuarioId,
        chamadoId: novoChamadoId,
      },
    };
  }

  async adicionarChamadoComStatusAberto(createChamadoDto: CreateChamadoDto) {
    const novoChamado = await this.prisma.tbChamado.create({
      data: createChamadoDto,
    });
    const statusDto = this.createStatusData(createChamadoDto, novoChamado.id);

    const novoStatusChamado = await this.prisma.tbStatusChamado.create({
      data: statusDto.data,
    });
    return 'salvo no banco ';
  }

  async findAll() {
    const chamado = await this.prisma.tbChamado.findMany();
    return chamado;
  }
  async findAllidUsuario(id: number) {
    const chamadosUsuario = await this.prisma.tbChamado.findMany({
      where: {
        usuarioId: id,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return chamadosUsuario;
  }

  /*  const chamados = await this.prisma.tbChamado.findMany({
      select: {
        clienteId: true,
      },
    });

    const clienteIds = chamados.map((chamado) => chamado.clienteId);
    const nomesClientes = await this.obterNomesClientesPorIds(clienteIds);

    return nomesClientes;
  }

  async obterNomesClientesPorIds(clienteIds: number[]): Promise<string[]> {
    const clientes = await this.prisma.tbCliente.findMany({
      where: {
        id: {
          in: clienteIds,
        },
      },
      select: {
        nome: true,
      },
    });

    const nomesClientes = clientes.map((cliente) => cliente.nome);

    return nomesClientes; */

  findOne(id: number) {
    return `This action returns a #${id} servico`;
  }
  async atualizarChamadoEStatus(
    IdChamado: number,
    updateChamado: UpdateServicoDto,
  ) {
    // Verifique se o chamado existe
    const chamadoExistente = await this.prisma.tbChamado.findUnique({
      where: { id: IdChamado },
    });

    if (!chamadoExistente) {
      throw new NotFoundException(
        `Chamado com ID ${IdChamado} não encontrado.`,
      );
    }

    // Atualize o chamado
    await this.prisma.tbChamado.update({
      where: { id: IdChamado },
      data: updateChamado,
    });

    // Encontre o status mais recente relacionado ao chamado
    const statusMaisRecente = await this.prisma.tbStatusChamado.findFirst({
      where: { chamadoId: IdChamado },
      orderBy: { dataAlteracao: 'desc' },
    });

    // Atualize o status mais recente
    if (statusMaisRecente) {
      await this.prisma.tbStatusChamado.update({
        where: { id: statusMaisRecente.id },
        data: {
          status: updateChamado.statusChamadoAtual,
          dataAlteracao: new Date(),
        },
      });
    }

    return 'Chamado e status atualizados no banco';
  }
}

/* 
  remove(id: number) {
    return `This action removes a #${id} servico`;
  }
} */
