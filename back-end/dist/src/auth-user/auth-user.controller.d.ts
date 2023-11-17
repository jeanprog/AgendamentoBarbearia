import { AuthUserService } from './auth-user.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
export declare class AuthUserController {
    private readonly authUserService;
    constructor(authUserService: AuthUserService);
    login(credentials: CreateAuthUserDto): Promise<{
        access_token: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAuthUserDto: UpdateAuthUserDto): string;
    remove(id: string): string;
}
