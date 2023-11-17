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
exports.UserLoginService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const password_service_1 = require("../auth-user/password.service");
let UserLoginService = class UserLoginService {
    constructor(prisma, passwordService) {
        this.prisma = prisma;
        this.passwordService = passwordService;
    }
    async create(createUserLoginDto) {
        const { password, ...otherUserProps } = createUserLoginDto;
        const hashedPassword = await this.passwordService.hashPassword(password);
        const newLogin = await this.prisma.tbLogin.create({
            data: {
                ...otherUserProps,
                password: hashedPassword,
            }
        });
        return `Usuario adicionado com sucesso - 200 OK`;
    }
    findAll() {
        return `This action returns all userLogin`;
    }
    findOne(id) {
        return `This action returns a #${id} userLogin`;
    }
    update(id, updateUserLoginDto) {
        return `This action updates a #${id} userLogin`;
    }
    remove(id) {
        return `This action removes a #${id} userLogin`;
    }
};
exports.UserLoginService = UserLoginService;
exports.UserLoginService = UserLoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        password_service_1.PasswordService])
], UserLoginService);
//# sourceMappingURL=user-login.service.js.map