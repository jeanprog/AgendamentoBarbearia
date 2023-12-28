// config-loja.dto.ts

import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  ArrayMinSize,
  ArrayMaxSize,
  Min,
  Max,
} from 'class-validator';

enum DiasSemana {
  Domingo = 1,
  Segunda = 2,
  Terca = 3,
  Quarta = 4,
  Quinta = 5,
  Sexta = 6,
  Sabado = 7,
}

export class CreateConfigLojaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(7, { each: true })
  diasAbertos: number[];

  @IsString()
  @IsNotEmpty()
  horarioAbertura: string;

  @IsString()
  @IsNotEmpty()
  horarioFechamento: string;

  situacao: string;

  @IsInt()
  userId: number;
}
