"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsesModule = void 0;
const common_1 = require("@nestjs/common");
const responses_service_1 = require("./responses.service");
const typeorm_1 = require("@nestjs/typeorm");
const responses_controller_1 = require("./responses.controller");
const responses_entities_1 = require("./responses.entities");
let ResponsesModule = class ResponsesModule {
};
ResponsesModule = __decorate([
    (0, common_1.Module)({
        controllers: [responses_controller_1.default],
        imports: [typeorm_1.TypeOrmModule.forFeature([responses_entities_1.Documents])],
        providers: [responses_service_1.ResponsesService],
        exports: [responses_service_1.ResponsesService],
    })
], ResponsesModule);
exports.ResponsesModule = ResponsesModule;
//# sourceMappingURL=responses.module.js.map