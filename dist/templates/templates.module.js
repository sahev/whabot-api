"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesModule = void 0;
const common_1 = require("@nestjs/common");
const templates_service_1 = require("./templates.service");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../entities/index");
const templates_controller_1 = require("./templates.controller");
let TemplatesModule = class TemplatesModule {
};
TemplatesModule = __decorate([
    (0, common_1.Module)({
        controllers: [templates_controller_1.default],
        imports: [typeorm_1.TypeOrmModule.forFeature([index_1.Templates])],
        providers: [templates_service_1.TemplatesService],
        exports: [templates_service_1.TemplatesService],
    })
], TemplatesModule);
exports.TemplatesModule = TemplatesModule;
//# sourceMappingURL=templates.module.js.map