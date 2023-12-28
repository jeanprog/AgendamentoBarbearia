import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<string>;
    allUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        cpf: string;
        email: string;
        situacao: string;
    }[]>;
    findOne(id: number): Promise<string | {
        id: number;
        name: string;
        cpf: string;
        email: string;
        situacao: string;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
