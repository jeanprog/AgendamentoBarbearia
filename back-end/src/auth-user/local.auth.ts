//local.auth.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserService } from '../auth-user/auth-user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthUserService) {
    super();
  }

  async validate(CreateAuthUserDto: CreateAuthUserDto): Promise<any> {
    const user = await this.authService.authenticateuser(CreateAuthUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
