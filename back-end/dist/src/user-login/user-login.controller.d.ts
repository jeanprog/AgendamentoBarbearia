import { UserLoginService } from './user-login.service';
import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
export declare class UserLoginController {
    private readonly userLoginService;
    constructor(userLoginService: UserLoginService);
    create(createUserLoginDto: CreateUserLoginDto): Promise<string>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        nameUser: string;
        Id: number;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateUserLoginDto: UpdateUserLoginDto): string;
    remove(id: string): string;
}
