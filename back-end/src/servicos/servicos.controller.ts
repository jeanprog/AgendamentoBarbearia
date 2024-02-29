import { StatusChamadoDTO } from './dto/create-status-chamado.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateChamadoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { get } from 'http';

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

  @Get('user/chamadosdia/:id')
  findChamadosDiauser(
    @Param('id') id: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ) {
    const dataInicioDate = new Date(dataInicio);
    const dataFimDate = new Date(dataFim);
    console.log('ID do usuário:', id);
    console.log('Data de início:', dataInicio);
    console.log('Data de fim:', dataFim);
    return this.servicosService.retornaChamadosDia(
      +id,
      dataInicioDate,
      dataFimDate,
    );
  }

  @Get('user/:id')
  findChamadosUser(@Param('id') id: string) {
    return this.servicosService.findAllidUsuario(+id);
  }

  @Get('user/date/:id')
  findChamadoDiaAtual(@Param('id') id: string) {
    const dataAtual = new Date();
    console.log(dataAtual);
    return this.servicosService.todosChamadoDodia(+id, dataAtual);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    console.log(id, UpdateServicoDto);
    return this.servicosService.atualizarChamadoEStatus(+id, updateServicoDto);
  }

  /*  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicosService.remove(+id);
  } */
}
