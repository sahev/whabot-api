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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../entities");
const workflows_entities_1 = require("./workflows.entities");
let WorkflowsServices = class WorkflowsServices {
    constructor(workflowsRepository, botsRepository) {
        this.workflowsRepository = workflowsRepository;
        this.botsRepository = botsRepository;
    }
    async findAll() {
        return await this.workflowsRepository.find();
    }
    async newWorkflow(data) {
        try {
            return await this.workflowsRepository.save(data);
        }
        catch (_a) {
            return new common_1.BadRequestException("Workflow already exists.").getResponse();
        }
    }
    async findAllBots() {
        return await this.botsRepository.find();
    }
};
WorkflowsServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workflows_entities_1.Workflows)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Bots)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WorkflowsServices);
exports.WorkflowsServices = WorkflowsServices;
//# sourceMappingURL=workflows.service.js.map