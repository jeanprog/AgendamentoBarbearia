import { CreateChamadoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from '../database/prisma.service';
export declare class ServicosService {
    private prisma;
    constructor(prisma: PrismaService);
    private createStatusData;
    adicionarChamadoComStatusAberto(createChamadoDto: CreateChamadoDto): Promise<string>;
    findAll(): Promise<{
        id: number;
        titulo: string;
        prioridade: string;
        sistema: string;
        dAbertura: Date;
        dFechamento: Date;
        descricao: string;
        usuarioId: number;
        redeId: number;
        clienteId: number;
        statusChamadoAtual: number;
    }[]>;
    findAllidUsuario(id: number): Promise<{
        id: number;
        titulo: string;
        prioridade: string;
        sistema: string;
        dAbertura: Date;
        dFechamento: Date;
        descricao: string;
        usuarioId: number;
        redeId: number;
        clienteId: number;
        statusChamadoAtual: number;
    }[]>;
    todosChamadoDodia(id: number, dataAtual: Date): Promise<{
        id: number;
        titulo: string;
        prioridade: string;
        sistema: string;
        dAbertura: Date;
        dFechamento: Date;
        descricao: string;
        usuarioId: number;
        redeId: number;
        clienteId: number;
        statusChamadoAtual: number;
    }[]>;
    findOne(id: number): string;
    atualizarChamadoEStatus(IdChamado: number, updateChamado: UpdateServicoDto): Promise<string>;
    retornaChamadosDia(id: number, dataInicio: Date, dataFim: Date): Promise<{
        id: number;
        titulo: string;
        prioridade: string;
        sistema: string;
        dAbertura: Date;
        dFechamento: Date;
        descricao: string;
        usuarioId: number;
        redeId: number;
        clienteId: number;
        statusChamadoAtual: number;
    }[]>;
}
