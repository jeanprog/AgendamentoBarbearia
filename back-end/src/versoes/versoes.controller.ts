import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VersoesService } from './versoes.service';
import { CreateVersoeDto } from './dto/create-versoe.dto';
import { UpdateVersoeDto } from './dto/update-versoe.dto';

@Controller('versoes')
export class VersoesController {
  constructor(private readonly versoesService: VersoesService) {}

  @Post()
  create(@Body() createVersoeDto: CreateVersoeDto) {
    console.log('chamei aqui o post');
    return this.versoesService.create(createVersoeDto);
  }

  @Get()
  findAll() {
    return this.versoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersoeDto: UpdateVersoeDto) {
    return this.versoesService.update(+id, updateVersoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versoesService.remove(+id);
  }
}
