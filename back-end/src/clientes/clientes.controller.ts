import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientesService } from './ClientesService';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    const newCliente = await this.clientesService.create(createClienteDto);
    return 'adicionado com sucesso';
  }

  @Get(':redeId')
  async findClientesByRedeId(@Param('redeId') redeId: string) {
    const result = await this.clientesService.findClientesByRedeId(
      parseInt(redeId, 10),
    );
    return result;
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':empresas/:id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
}
