import { StatusChamadoDTO } from './create-status-chamado.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateChamadoDto } from './create-servico.dto';

export class UpdateServicoDto extends PartialType(CreateChamadoDto) {}

export class updateStatusDto extends PartialType(StatusChamadoDTO) {}
