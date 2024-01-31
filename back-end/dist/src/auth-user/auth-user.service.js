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
exports.AuthUserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const password_service_1 = require("./password.service");
let AuthUserService = class AuthUserService {
    constructor(prisma, jwtService, passwordService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.passwordService = passwordService;
    }
    async authenticateuser(createAuthUserDto) {
        const user = await this.prisma.tbLogin.findFirst({
            where: {
                nameUser: createAuthUserDto.nameUser,
            },
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = await this.passwordService.comparePasswords(createAuthUserDto.password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        console.log(user, 'teste retorno');
        return await this.gerarToken(user);
    }
    async gerarToken(payload) {
        return {
            access_token: this.jwtService.sign({
                nameUser: payload.nameUser,
                idRede: payload.redeId,
                idUser: payload.Id,
            }, {
                secret: 'topSecret512',
                expiresIn: '50s',
            }),
        };
    }
    findAll() {
        return `This action returns all authUser`;
    }
    findOne(id) {
        return `This action returns a #${id} authUser`;
    }
    update(id, updateAuthUserDto) {
        return `This action updates a #${id} authUser`;
    }
    remove(id) {
        return `This action removes a #${id} authUser`;
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        password_service_1.PasswordService])
], AuthUserService);
//# sourceMappingURL=auth-user.service.js.map