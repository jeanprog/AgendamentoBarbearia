import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../database/prisma.service';
export declare class ClientesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createClienteDto: CreateClienteDto): Promise<{
        id: number;
        nome: string;
        empresa: string;
        telefone: string;
        redeId: number;
    }>;
    findClientesByRedeId(redeId: number): Promise<{
        id: number;
        nome: string;
        empresa: string;
        telefone: string;
        redeId: number;
    }[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        empresa: string;
        telefone: string;
        redeId: number;
    }[]>;
    findOne(id: number): Promise<string | {
        id: number;
        nome: string;
        empresa: string;
        telefone: string;
        redeId: number;
    }>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<string | {
        id: number;
        nome: string;
        empresa: string;
        telefone: string;
        redeId: number;
    }>;
    remove(id: number): string;
}
