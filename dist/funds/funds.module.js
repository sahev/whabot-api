"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundsModule = void 0;
const common_1 = require("@nestjs/common");
const funds_service_1 = require("./funds.service");
const funds_controller_1 = require("./funds.controller");
let FundsModule = class FundsModule {
};
FundsModule = __decorate([
    (0, common_1.Module)({
        controllers: [funds_controller_1.default],
        imports: [],
        providers: [funds_service_1.FundsService],
        exports: [funds_service_1.FundsService],
    })
], FundsModule);
exports.FundsModule = FundsModule;
//# sourceMappingURL=funds.module.js.map