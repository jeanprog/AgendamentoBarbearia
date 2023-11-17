import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../database/prisma.service';
export declare class ClientesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createClienteDto: CreateClienteDto): Promise<{
        id: number;
        nome: string;
        telefone: string;
        userId: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        telefone: string;
        userId: number;
    }[]>;
    findOne(id: number): Promise<string | {
        id: number;
        nome: string;
        telefone: string;
        userId: number;
    }>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<any>;
    remove(id: number): string;
}
