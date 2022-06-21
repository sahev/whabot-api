"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const conditionals_controller_1 = require("./conditionals.controller");
const conditionals_entities_1 = require("./conditionals.entities");
const conditionals_service_1 = require("./conditionals.service");
let ConditionalsModule = class ConditionalsModule {
};
ConditionalsModule = __decorate([
    (0, common_1.Module)({
        controllers: [conditionals_controller_1.ConditionalsController],
        imports: [typeorm_1.TypeOrmModule.forFeature([conditionals_entities_1.Conditionals])],
        providers: [conditionals_service_1.ConditionalsServices],
        exports: [conditionals_service_1.ConditionalsServices],
    })
], ConditionalsModule);
exports.ConditionalsModule = ConditionalsModule;
//# sourceMappingURL=conditionals.module.js.map