import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitacaoDesenvDto } from './create-solicitacao-desenv.dto';

export class UpdateSolicitacaoDesenvDto extends PartialType(CreateSolicitacaoDesenvDto) {}
