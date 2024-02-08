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
    createStatusData(chamadoData, novoChamadoId) {
        return {
            data: {
                status: chamadoData.statusChamadoAtual,
                dataAlteracao: new Date(),
                usuarioId: chamadoData.usuarioId,
                chamadoId: novoChamadoId,
            },
        };
    }
    async adicionarChamadoComStatusAberto(createChamadoDto) {
        const novoChamado = await this.prisma.tbChamado.create({
            data: createChamadoDto,
        });
        const statusDto = this.createStatusData(createChamadoDto, novoChamado.id);
        const novoStatusChamado = await this.prisma.tbStatusChamado.create({
            data: statusDto.data,
        });
        return 'salvo no banco ';
    }
    async findAll() {
        const chamado = await this.prisma.tbChamado.findMany();
        return chamado;
    }
    async findAllidUsuario(id) {
        const chamadosUsuario = await this.prisma.tbChamado.findMany({
            where: {
                usuarioId: id,
            },
            orderBy: {
                id: 'desc',
            },
        });
        return chamadosUsuario;
    }
    findOne(id) {
        return `This action returns a #${id} servico`;
    }
    async atualizarChamadoEStatus(IdChamado, updateChamado) {
        const chamadoExistente = await this.prisma.tbChamado.findUnique({
            where: { id: IdChamado },
        });
        if (!chamadoExistente) {
            throw new common_1.NotFoundException(`Chamado com ID ${IdChamado} não encontrado.`);
        }
        await this.prisma.tbChamado.update({
            where: { id: IdChamado },
            data: updateChamado,
        });
        const statusMaisRecente = await this.prisma.tbStatusChamado.findFirst({
            where: { chamadoId: IdChamado },
            orderBy: { dataAlteracao: 'desc' },
        });
        if (statusMaisRecente) {
            await this.prisma.tbStatusChamado.update({
                where: { id: statusMaisRecente.id },
                data: {
                    status: updateChamado.statusChamadoAtual,
                    dataAlteracao: new Date(),
                },
            });
        }
        return 'Chamado e status atualizados no banco';
    }
};
exports.ServicosService = ServicosService;
exports.ServicosService = ServicosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicosService);
//# sourceMappingURL=servicos.service.js.map