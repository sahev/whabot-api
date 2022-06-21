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
exports.ConditionalsServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conditionals_entities_1 = require("./conditionals.entities");
let ConditionalsServices = class ConditionalsServices {
    constructor(conditionalsRepository) {
        this.conditionalsRepository = conditionalsRepository;
    }
    async findAll() {
        return await this.conditionalsRepository.find();
    }
    async newConditional(data) {
        try {
            return await this.conditionalsRepository.save(data);
        }
        catch (_a) {
            return new common_1.BadRequestException("Conditional already exists for the same stage.").getResponse();
        }
    }
    async conditionalsByStage(con_stage) {
        return await this.conditionalsRepository.find(con_stage);
    }
    async deleteConditional(con_conditional) {
        return await this.conditionalsRepository.delete(con_conditional);
    }
};
ConditionalsServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conditionals_entities_1.Conditionals)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConditionalsServices);
exports.ConditionalsServices = ConditionalsServices;
//# sourceMappingURL=conditionals.service.js.map