import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitacaoDesenvService } from './solicitacao-desenv.service';
import { CreateSolicitacaoDesenvDto } from './dto/create-solicitacao-desenv.dto';
import { UpdateSolicitacaoDesenvDto } from './dto/update-solicitacao-desenv.dto';

@Controller('solicitacao-desenv')
export class SolicitacaoDesenvController {
  constructor(private readonly solicitacaoDesenvService: SolicitacaoDesenvService) {}

  @Post()
  create(@Body() createSolicitacaoDesenvDto: CreateSolicitacaoDesenvDto) {
    return this.solicitacaoDesenvService.create(createSolicitacaoDesenvDto);
  }

  @Get()
  findAll() {
    return this.solicitacaoDesenvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitacaoDesenvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitacaoDesenvDto: UpdateSolicitacaoDesenvDto) {
    return this.solicitacaoDesenvService.update(+id, updateSolicitacaoDesenvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitacaoDesenvService.remove(+id);
  }
}
