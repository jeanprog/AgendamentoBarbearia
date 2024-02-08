import { ServicosService } from './servicos.service';
import { CreateChamadoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
export declare class ServicosController {
    private readonly servicosService;
    constructor(servicosService: ServicosService);
    create(createChamadoDto: CreateChamadoDto): Promise<string>;
    retornaStatusChamado(): Promise<{
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
    findOne(id: string): string;
    findChamadosUser(id: string): Promise<{
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
    update(id: string, updateServicoDto: UpdateServicoDto): Promise<string>;
}
