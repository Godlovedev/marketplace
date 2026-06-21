"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const jwt_strategy_1 = require("./jwt.strategy");
const prisma_service_1 = require("../prisma.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: "8f5b3a2e7c1d9f4b6a8e3d2c5b1a7f9e8d4c2b6a3f1e9d7c5b8a2f4e6d9c1b3a2f5e7d8c9b1a3f4e6d7c8b9a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0alice",
                signOptions: { expiresIn: '30d' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, prisma_service_1.PrismaService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map