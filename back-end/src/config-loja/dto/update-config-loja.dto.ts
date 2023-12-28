import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigLojaDto } from './create-config-loja.dto';

export class UpdateConfigLojaDto extends PartialType(CreateConfigLojaDto) {}
