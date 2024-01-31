"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusDto = exports.UpdateServicoDto = void 0;
const create_status_chamado_dto_1 = require("./create-status-chamado.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_servico_dto_1 = require("./create-servico.dto");
class UpdateServicoDto extends (0, mapped_types_1.PartialType)(create_servico_dto_1.CreateChamadoDto) {
}
exports.UpdateServicoDto = UpdateServicoDto;
class updateStatusDto extends (0, mapped_types_1.PartialType)(create_status_chamado_dto_1.StatusChamadoDTO) {
}
exports.updateStatusDto = updateStatusDto;
//# sourceMappingURL=update-servico.dto.js.map