"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicosController = void 0;
const common_1 = require("@nestjs/common");
const servicos_service_1 = require("./servicos.service");
const create_servico_dto_1 = require("./dto/create-servico.dto");
const update_servico_dto_1 = require("./dto/update-servico.dto");
let ServicosController = class ServicosController {
    constructor(servicosService) {
        this.servicosService = servicosService;
    }
    create(createChamadoDto) {
        const newChamado = this.servicosService.adicionarChamadoComStatusAberto(createChamadoDto);
        return newChamado;
    }
    retornaStatusChamado() {
        return this.servicosService.findAll();
    }
    findOne(id) {
        return this.servicosService.findOne(+id);
    }
    findChamadosUser(id) {
        return this.servicosService.findAllidUsuario(+id);
    }
    update(id, updateServicoDto) {
        console.log(id, update_servico_dto_1.UpdateServicoDto);
        return this.servicosService.atualizarChamadoEStatus(+id, updateServicoDto);
    }
};
exports.ServicosController = ServicosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_servico_dto_1.CreateChamadoDto]),
    __metadata("design:returntype", void 0)
], ServicosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicosController.prototype, "retornaStatusChamado", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicosController.prototype, "findChamadosUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_servico_dto_1.UpdateServicoDto]),
    __metadata("design:returntype", void 0)
], ServicosController.prototype, "update", null);
exports.ServicosController = ServicosController = __decorate([
    (0, common_1.Controller)('servicos'),
    __metadata("design:paramtypes", [servicos_service_1.ServicosService])
], ServicosController);
//# sourceMappingURL=servicos.controller.js.map