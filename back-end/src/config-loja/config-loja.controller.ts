import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfigLojaService } from './config-loja.service';
import { CreateConfigLojaDto } from './dto/create-config-loja.dto';
import { UpdateConfigLojaDto } from './dto/update-config-loja.dto';

@Controller('config-loja')
export class ConfigLojaController {
  constructor(private readonly configLojaService: ConfigLojaService) {}

  @Post()
  create(@Body() createConfigLojaDto: CreateConfigLojaDto) {
    return this.configLojaService.create(createConfigLojaDto);
  }

  @Get()
  findAll() {
    return this.configLojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configLojaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfigLojaDto: UpdateConfigLojaDto,
  ) {
    return this.configLojaService.update(+id, updateConfigLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configLojaService.remove(+id);
  }
}
