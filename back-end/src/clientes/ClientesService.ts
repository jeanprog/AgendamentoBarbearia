
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../database/prisma.service';


@Injectable()
export class ClientesService {

constructor(private prisma: PrismaService) { }
async create(createClienteDto: CreateClienteDto) {
const newCliente = await this.prisma.tbCliente.create({
data: createClienteDto
});

   return newCliente; 
}

findAll() {
 return this.prisma.tbCliente.findMany();
}

async findOne(id: number) {
    const cliente = await this.prisma.tbCliente.findUnique({ where: { id: Number(id) } });

    if (!cliente) {
      return `User with ID #${id} não foi encontrado` ;
    }

    return cliente ;
  }



async update(id: number, updateClienteDto: UpdateClienteDto) {
    const existingCliente = await this.prisma.client.tbCliente.findUnique({
        where: { id },
      });
    
      if (!existingCliente) {
        throw new NotFoundException(`Cliente #${id} não encontrado`);
      }
  
      // Atualiza os campos fornecidos no DTO
      const updatedCliente = await this.prisma.client.tbCliente.update({
        where: { id },
        data: updateClienteDto,
      });
  
      return updatedCliente;
    }


remove(id: number) {
return `This action removes a #${id} cliente`;
}
}
