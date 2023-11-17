import { ClientesService } from './ClientesService';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(createClienteDto: CreateClienteDto): Promise<string>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nome: string;
        telefone: string;
        userId: number;
    }[]>;
    findOne(id: string): Promise<string | {
        id: number;
        nome: string;
        telefone: string;
        userId: number;
    }>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<any>;
    remove(id: string): string;
}
