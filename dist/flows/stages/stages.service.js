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
exports.StagesServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stages_entities_1 = require("./stages.entities");
let StagesServices = class StagesServices {
    constructor(stagesRepository) {
        this.stagesRepository = stagesRepository;
    }
    async findAll() {
        return await this.stagesRepository.find();
    }
    async updateStage(data) {
        return await this.stagesRepository.update({ id: data.id }, data);
    }
    async newStage(data) {
        try {
            return await this.stagesRepository.save(data);
        }
        catch (_a) {
            return new common_1.BadRequestException("Stage already exists.").getResponse();
        }
    }
    async stageByWorkflow(workflow) {
        return await this.stagesRepository.find(workflow);
    }
    async deleteStage(id) {
        return await this.stagesRepository.delete(id);
    }
};
StagesServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stages_entities_1.Stages)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StagesServices);
exports.StagesServices = StagesServices;
//# sourceMappingURL=stages.service.js.map