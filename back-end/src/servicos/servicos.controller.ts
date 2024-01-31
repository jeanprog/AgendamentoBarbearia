import { StatusChamadoDTO } from './dto/create-status-chamado.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateChamadoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Post()
  create(@Body() createChamadoDto: CreateChamadoDto) {
    const newChamado =
      this.servicosService.adicionarChamadoComStatusAberto(createChamadoDto);
    return newChamado;
  }
  @Get()
  retornaStatusChamado() {
    return this.servicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    return this.servicosService.atualizarChamadoEStatus(+id, updateServicoDto);
  }

  /*  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicosService.remove(+id);
  } */
}
