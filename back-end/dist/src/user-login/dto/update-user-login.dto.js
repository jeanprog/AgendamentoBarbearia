"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserLoginDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_login_dto_1 = require("./create-user-login.dto");
class UpdateUserLoginDto extends (0, mapped_types_1.PartialType)(create_user_login_dto_1.CreateUserLoginDto) {
}
exports.UpdateUserLoginDto = UpdateUserLoginDto;
//# sourceMappingURL=update-user-login.dto.js.map