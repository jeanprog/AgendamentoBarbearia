import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { PrismaService } from '../database/prisma.service';
import { PasswordService } from 'src/auth-user/password.service';
export declare class UserLoginService {
    private prisma;
    private passwordService;
    constructor(prisma: PrismaService, passwordService: PasswordService);
    create(createUserLoginDto: CreateUserLoginDto): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserLoginDto: UpdateUserLoginDto): string;
    remove(id: number): string;
}
