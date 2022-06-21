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
exports.ConditionalsController = void 0;
const common_1 = require("@nestjs/common");
const conditionals_service_1 = require("./conditionals.service");
const conditionals_dto_1 = require("./conditionals.dto");
let ConditionalsController = class ConditionalsController {
    constructor(conServices) {
        this.conServices = conServices;
    }
    getAllWfs() {
        return this.conServices.findAll();
    }
    getConditionalsByStage(con_stage) {
        return this.conServices.conditionalsByStage(con_stage);
    }
    newConditional(data) {
        return this.conServices.newConditional(data);
    }
    deleteConditional(con_conditional) {
        return this.conServices.deleteConditional(con_conditional);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConditionalsController.prototype, "getAllWfs", null);
__decorate([
    (0, common_1.Get)(':con_stage'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conditionals_dto_1.ConditionalsDTO]),
    __metadata("design:returntype", void 0)
], ConditionalsController.prototype, "getConditionalsByStage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conditionals_dto_1.ConditionalsDTO]),
    __metadata("design:returntype", void 0)
], ConditionalsController.prototype, "newConditional", null);
__decorate([
    (0, common_1.Delete)(':con_conditional'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [conditionals_dto_1.ConditionalsDTO]),
    __metadata("design:returntype", void 0)
], ConditionalsController.prototype, "deleteConditional", null);
ConditionalsController = __decorate([
    (0, common_1.Controller)('conditionals'),
    __metadata("design:paramtypes", [conditionals_service_1.ConditionalsServices])
], ConditionalsController);
exports.ConditionalsController = ConditionalsController;
//# sourceMappingURL=conditionals.controller.js.map