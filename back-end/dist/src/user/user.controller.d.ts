import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<string>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        nameRede: string;
        cnpj: string;
        email: string;
        situacao: string;
    }[]>;
    findOne(id: string): Promise<string | {
        id: number;
        nameRede: string;
        cnpj: string;
        email: string;
        situacao: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
