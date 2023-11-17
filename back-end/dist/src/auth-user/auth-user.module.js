"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserModule = void 0;
const common_1 = require("@nestjs/common");
const auth_user_service_1 = require("./auth-user.service");
const auth_user_controller_1 = require("./auth-user.controller");
const prisma_service_1 = require("../database/prisma.service");
const prisma_module_1 = require("../database/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const local_auth_1 = require("./local.auth");
const password_service_1 = require("./password.service");
let AuthUserModule = class AuthUserModule {
};
exports.AuthUserModule = AuthUserModule;
exports.AuthUserModule = AuthUserModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, passport_1.PassportModule,
            jwt_1.JwtModule],
        controllers: [auth_user_controller_1.AuthUserController],
        providers: [auth_user_service_1.AuthUserService, prisma_service_1.PrismaService, jwt_1.JwtService, local_auth_1.LocalStrategy, password_service_1.PasswordService],
    })
], AuthUserModule);
//# sourceMappingURL=auth-user.module.js.map