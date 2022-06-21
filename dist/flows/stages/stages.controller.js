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
exports.StagesController = void 0;
const common_1 = require("@nestjs/common");
const stages_service_1 = require("./stages.service");
const stages_dto_1 = require("./stages.dto");
let StagesController = class StagesController {
    constructor(staServices) {
        this.staServices = staServices;
    }
    getAllStages() {
        return this.staServices.findAll();
    }
    getStageByWorkflow(workflow) {
        return this.staServices.stageByWorkflow(workflow);
    }
    updateStage(data) {
        return this.staServices.updateStage(data);
    }
    newStage(data) {
        return this.staServices.newStage(data);
    }
    deleteStage(id) {
        return this.staServices.deleteStage(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StagesController.prototype, "getAllStages", null);
__decorate([
    (0, common_1.Get)(':workflow'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stages_dto_1.StagesDTO]),
    __metadata("design:returntype", void 0)
], StagesController.prototype, "getStageByWorkflow", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stages_dto_1.StagesDTO]),
    __metadata("design:returntype", void 0)
], StagesController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stages_dto_1.StagesDTO]),
    __metadata("design:returntype", void 0)
], StagesController.prototype, "newStage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stages_dto_1.StagesDTO]),
    __metadata("design:returntype", void 0)
], StagesController.prototype, "deleteStage", null);
StagesController = __decorate([
    (0, common_1.Controller)('stages'),
    __metadata("design:paramtypes", [stages_service_1.StagesServices])
], StagesController);
exports.StagesController = StagesController;
//# sourceMappingURL=stages.controller.js.map