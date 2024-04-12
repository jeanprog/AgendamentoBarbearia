import { PartialType } from '@nestjs/mapped-types';
import { CreateVersoeDto } from './create-versoe.dto';

export class UpdateVersoeDto extends PartialType(CreateVersoeDto) {}
