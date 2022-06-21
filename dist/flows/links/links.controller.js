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
exports.LinksController = void 0;
const common_1 = require("@nestjs/common");
const links_service_1 = require("./links.service");
const links_dto_1 = require("./links.dto");
let LinksController = class LinksController {
    constructor(linkServices) {
        this.linkServices = linkServices;
    }
    getAllLinks() {
        return this.linkServices.findAll();
    }
    linksByWorkflow(id) {
        return this.linkServices.linksByWorkflow(id.id);
    }
    newLink(workflowId, data) {
        return this.linkServices.newLink(data, workflowId.id);
    }
    deleteLink(id) {
        return this.linkServices.deleteLink(id);
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "getAllLinks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "linksByWorkflow", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "newLink", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [links_dto_1.LinksDTO]),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "deleteLink", null);
LinksController = __decorate([
    (0, common_1.Controller)('link'),
    __metadata("design:paramtypes", [links_service_1.LinksServices])
], LinksController);
exports.LinksController = LinksController;
//# sourceMappingURL=links.controller.js.map