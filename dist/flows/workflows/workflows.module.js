"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const workflows_controller_1 = require("./workflows.controller");
const workflows_entities_1 = require("./workflows.entities");
const index_1 = require("../../entities/index");
const workflows_service_1 = require("./workflows.service");
let WorkflowsModule = class WorkflowsModule {
};
WorkflowsModule = __decorate([
    (0, common_1.Module)({
        controllers: [workflows_controller_1.WorkflowsController],
        imports: [typeorm_1.TypeOrmModule.forFeature([workflows_entities_1.Workflows, index_1.Bots])],
        providers: [workflows_service_1.WorkflowsServices],
        exports: [workflows_service_1.WorkflowsServices],
    })
], WorkflowsModule);
exports.WorkflowsModule = WorkflowsModule;
//# sourceMappingURL=workflows.module.js.map