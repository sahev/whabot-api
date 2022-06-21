"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stages_controller_1 = require("./stages.controller");
const stages_entities_1 = require("./stages.entities");
const stages_service_1 = require("./stages.service");
let StagesModule = class StagesModule {
};
StagesModule = __decorate([
    (0, common_1.Module)({
        controllers: [stages_controller_1.StagesController],
        imports: [typeorm_1.TypeOrmModule.forFeature([stages_entities_1.Stages])],
        providers: [stages_service_1.StagesServices],
        exports: [stages_service_1.StagesServices],
    })
], StagesModule);
exports.StagesModule = StagesModule;
//# sourceMappingURL=stages.module.js.map