import { ClientesService } from './ClientesService';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(createClienteDto: CreateClienteDto): Promise<string>;
    findClientesByRedeId(redeId: string): Promise<{
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
    findOne(id: string): Promise<string | {
        id: number;
        nome: string;
        empresa: string;
        telefone: string;
        redeId: number;
    }>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<string | {
        id: number;
        nome: string;
        empresa: string;
        telefone: string;
        redeId: number;
    }>;
    remove(id: string): string;
}
