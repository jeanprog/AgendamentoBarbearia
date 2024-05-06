import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SolucaoVersaoService } from './solucao-versao.service';
import { CreateSolucaoVersaoDto } from './dto/create-solucao-versao.dto';
import { UpdateSolucaoVersaoDto } from './dto/update-solucao-versao.dto';

@Controller('solucao-versao')
export class SolucaoVersaoController {
  constructor(private readonly solucaoVersaoService: SolucaoVersaoService) {}

  @Post()
  create(@Body() createSolucaoVersaoDto: CreateSolucaoVersaoDto) {
    return this.solucaoVersaoService.create(createSolucaoVersaoDto);
  }

  @Get()
  findAll() {
    return this.solucaoVersaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solucaoVersaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSolucaoVersaoDto: UpdateSolucaoVersaoDto,
  ) {
    return this.solucaoVersaoService.update(+id, updateSolucaoVersaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solucaoVersaoService.remove(+id);
  }
}
