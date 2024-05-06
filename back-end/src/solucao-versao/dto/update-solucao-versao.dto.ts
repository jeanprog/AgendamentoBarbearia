import { PartialType } from '@nestjs/mapped-types';
import { CreateSolucaoVersaoDto } from './create-solucao-versao.dto';

export class UpdateSolucaoVersaoDto extends PartialType(CreateSolucaoVersaoDto) {}
