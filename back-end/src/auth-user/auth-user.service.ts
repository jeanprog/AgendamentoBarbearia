import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';

@Injectable()
export class AuthUserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}
  async authenticateuser(createAuthUserDto: CreateAuthUserDto) {
    const user = await this.prisma.tbLogin.findFirst({
      where: {
        nameUser: createAuthUserDto.nameUser,
      },
    });

    if (!user) {
      return null; // Usuário não encontrado
    }

    // Agora, verifique se a senha fornecida corresponde à senha armazenada no banco de dados.
    const isPasswordValid = await this.passwordService.comparePasswords(
      createAuthUserDto.password,
      user.password, // user.password is the hashed password stored in the database
    );

    if (!isPasswordValid) {
      return null; // Senha incorreta
    }
    console.log(user, 'teste retorno');
    return await this.gerarToken(user);
  }

  async gerarToken(payload: any) {
    return {
      access_token: this.jwtService.sign(
        {
          nameUser: payload.nameUser,
          idRede: payload.redeId,
          idUser: payload.Id,
        },
        {
          secret: 'topSecret512',
          expiresIn: '50s',
        },
      ),
    };
  }

  findAll() {
    return `This action returns all authUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authUser`;
  }

  update(id: number, updateAuthUserDto: UpdateAuthUserDto) {
    return `This action updates a #${id} authUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} authUser`;
  }
}
