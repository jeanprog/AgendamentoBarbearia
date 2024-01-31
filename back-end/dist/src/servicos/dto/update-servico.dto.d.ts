import { StatusChamadoDTO } from './create-status-chamado.dto';
import { CreateChamadoDto } from './create-servico.dto';
declare const UpdateServicoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateChamadoDto>>;
export declare class UpdateServicoDto extends UpdateServicoDto_base {
}
declare const updateStatusDto_base: import("@nestjs/mapped-types").MappedType<Partial<StatusChamadoDTO>>;
export declare class updateStatusDto extends updateStatusDto_base {
}
export {};
