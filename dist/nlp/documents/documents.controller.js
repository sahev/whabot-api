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
const documents_service_1 = require("./documents.service");
const DocumentsDTO_1 = require("./DocumentsDTO");
const common_1 = require("@nestjs/common");
let ResponsesController = class ResponsesController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    getAllUsers() {
        const allUsers = this.documentsService.findAll();
        return allUsers;
    }
    createUser(data) {
        return this.documentsService.create(data);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResponsesController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DocumentsDTO_1.DocumentsDTO]),
    __metadata("design:returntype", void 0)
], ResponsesController.prototype, "createUser", null);
ResponsesController = __decorate([
    (0, common_1.Controller)('response'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], ResponsesController);
exports.default = ResponsesController;
//# sourceMappingURL=documents.controller.js.map