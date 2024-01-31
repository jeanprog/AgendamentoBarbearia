"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./database/prisma.module");
const user_login_module_1 = require("./user-login/user-login.module");
const auth_user_module_1 = require("./auth-user/auth-user.module");
const clientes_module_1 = require("./clientes/clientes.module");
const servicos_module_1 = require("./servicos/servicos.module");
const config_loja_module_1 = require("./config-loja/config-loja.module");
const filters_module_1 = require("./filters/filters.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, user_module_1.UserModule, user_login_module_1.UserLoginModule, auth_user_module_1.AuthUserModule, clientes_module_1.ClientesModule, servicos_module_1.ServicosModule, config_loja_module_1.ConfigLojaModule, filters_module_1.FiltersModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map