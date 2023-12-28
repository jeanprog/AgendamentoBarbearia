import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
export declare class ServicosController {
    private readonly servicosService;
    constructor(servicosService: ServicosService);
    create(createServicoDto: CreateServicoDto): Promise<string>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        duracao: number;
        preco: number;
        descricao: string;
        categoria: string;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateServicoDto: UpdateServicoDto): Promise<string | {
        id: number;
        nome: string;
        duracao: number;
        preco: number;
        descricao: string;
        categoria: string;
    }>;
    remove(id: string): string;
}
