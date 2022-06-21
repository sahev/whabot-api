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
exports.WorkflowsController = void 0;
const common_1 = require("@nestjs/common");
const workflows_service_1 = require("./workflows.service");
const workflows_dto_1 = require("./workflows.dto");
let WorkflowsController = class WorkflowsController {
    constructor(wfServices) {
        this.wfServices = wfServices;
    }
    getAllWfs() {
        return this.wfServices.findAll();
    }
    getWorkflowsByBot() {
        return this.wfServices.findAllBots();
    }
    createUser(data) {
        return this.wfServices.newWorkflow(data);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "getAllWfs", null);
__decorate([
    (0, common_1.Get)('bots'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "getWorkflowsByBot", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workflows_dto_1.WorkflowsDTO]),
    __metadata("design:returntype", void 0)
], WorkflowsController.prototype, "createUser", null);
WorkflowsController = __decorate([
    (0, common_1.Controller)('workflows'),
    __metadata("design:paramtypes", [workflows_service_1.WorkflowsServices])
], WorkflowsController);
exports.WorkflowsController = WorkflowsController;
//# sourceMappingURL=workflows.controller.js.map