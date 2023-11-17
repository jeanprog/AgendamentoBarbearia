import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { UpdateAuthUserDto } from './dto/update-auth-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post()
  async login(@Body() credentials: CreateAuthUserDto) {
    const { nameUser, password } = credentials;

    const user = await this.authUserService.authenticateuser(credentials);
    

    if (!user) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    // Agora que o usuário foi autenticado com sucesso, você pode gerar e retornar um token JWT, se necessário.
    // const token = this.authService.generateJwtToken(user.userId);

    // Return a response with the authenticated user or token, as needed.
    return user ;
  }

  @Get()
  findAll() {
    return this.authUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthUserDto: UpdateAuthUserDto) {
    return this.authUserService.update(+id, updateAuthUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authUserService.remove(+id);
  }
}
