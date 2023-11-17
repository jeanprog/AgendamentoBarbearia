import { PrismaService } from '../database/prisma.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
export declare class AuthUserService {
    private prisma;
    private jwtService;
    private passwordService;
    constructor(prisma: PrismaService, jwtService: JwtService, passwordService: PasswordService);
    authenticateuser(createAuthUserDto: CreateAuthUserDto): Promise<{
        access_token: string;
    }>;
    gerarToken(payload: any): Promise<{
        access_token: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthUserDto: UpdateAuthUserDto): string;
    remove(id: number): string;
}
