"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesModule = void 0;
const prisma_service_1 = require("../database/prisma.service");
const prisma_module_1 = require("../database/prisma.module");
const common_1 = require("@nestjs/common");
const ClientesService_1 = require("./ClientesService");
const clientes_controller_1 = require("./clientes.controller");
let ClientesModule = class ClientesModule {
};
exports.ClientesModule = ClientesModule;
exports.ClientesModule = ClientesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [clientes_controller_1.ClientesController],
        providers: [ClientesService_1.ClientesService, prisma_service_1.PrismaService],
    })
], ClientesModule);
//# sourceMappingURL=clientes.module.js.map