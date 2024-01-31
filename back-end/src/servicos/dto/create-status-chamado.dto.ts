// status-chamado.dto.ts
import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class StatusChamadoDTO {
  status: number;

  dataAlteracao: Date;

  usuarioId: number;

  chamadoId: number;
}
