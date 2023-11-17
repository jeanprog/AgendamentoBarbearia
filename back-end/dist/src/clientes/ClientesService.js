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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ClientesService = class ClientesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClienteDto) {
        const newCliente = await this.prisma.tbCliente.create({
            data: createClienteDto
        });
        return newCliente;
    }
    findAll() {
        return this.prisma.tbCliente.findMany();
    }
    async findOne(id) {
        const cliente = await this.prisma.tbCliente.findUnique({ where: { id: Number(id) } });
        if (!cliente) {
            return `User with ID #${id} não foi encontrado`;
        }
        return cliente;
    }
    async update(id, updateClienteDto) {
        const existingCliente = await this.prisma.client.tbCliente.findUnique({
            where: { id },
        });
        if (!existingCliente) {
            throw new common_1.NotFoundException(`Cliente #${id} não encontrado`);
        }
        const updatedCliente = await this.prisma.client.tbCliente.update({
            where: { id },
            data: updateClienteDto,
        });
        return updatedCliente;
    }
    remove(id) {
        return `This action removes a #${id} cliente`;
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientesService);
//# sourceMappingURL=ClientesService.js.map