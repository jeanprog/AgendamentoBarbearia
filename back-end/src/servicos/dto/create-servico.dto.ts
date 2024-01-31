export class CreateChamadoDto {
  titulo: string;

  prioridade: string;

  sistema: string;

  dAbertura: Date;

  dFechamento: Date;

  descricao: string;

  usuarioId: number;
  clienteId: number;

  redeId: number;

  statusChamadoAtual: number;
}
