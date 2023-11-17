import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from '../database/prisma.service';
export declare class ServicosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createServicoDto: CreateServicoDto): Promise<string>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        duracao: number;
        preco: number;
        descricao: string;
        categoria: string;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateServicoDto: UpdateServicoDto): string;
    remove(id: number): string;
}
