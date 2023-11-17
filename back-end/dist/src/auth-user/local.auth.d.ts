import { Strategy } from 'passport-local';
import { AuthUserService } from '../auth-user/auth-user.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthUserService);
    validate(CreateAuthUserDto: CreateAuthUserDto): Promise<any>;
}
export {};
