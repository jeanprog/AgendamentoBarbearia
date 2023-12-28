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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ServicosService = class ServicosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createServicoDto) {
        const newServico = await this.prisma.tbServico.create({
            data: createServicoDto,
        });
        return 'This action adds a new servico';
    }
    findAll() {
        return this.prisma.tbServico.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} servico`;
    }
    async update(id, updateServicoDto) {
        const existingServico = await this.prisma.tbCliente.findUnique({
            where: { id },
        });
        if (!existingServico) {
            return `Cliente #${id} não encontrado`;
        }
        const updatedServico = await this.prisma.tbServico.update({
            where: { id },
            data: updateServicoDto,
        });
        return updatedServico;
    }
    remove(id) {
        return `This action removes a #${id} servico`;
    }
};
exports.ServicosService = ServicosService;
exports.ServicosService = ServicosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicosService);
//# sourceMappingURL=servicos.service.js.map