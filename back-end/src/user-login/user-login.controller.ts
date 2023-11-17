import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';

@Controller('user-login')
export class UserLoginController {
  constructor(private readonly userLoginService: UserLoginService) {}

  @Post()
  async create(@Body() createUserLoginDto: CreateUserLoginDto) {
    const newUserLogin = await  this.userLoginService.create(createUserLoginDto);

    return `usuário adicionado com sucesso`
  }

  @Get()
  findAll() {
    return this.userLoginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLoginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLoginDto: UpdateUserLoginDto) {
    return this.userLoginService.update(+id, updateUserLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLoginService.remove(+id);
  }
}
