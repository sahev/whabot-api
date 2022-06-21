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
const bots_service_1 = require("./bots.service");
const common_1 = require("@nestjs/common");
let BotsController = class BotsController {
    constructor(botsServices) {
        this.botsServices = botsServices;
    }
    newBot(data) {
        return this.botsServices.newBot(data);
    }
    editBot(botname, data) {
        return this.botsServices.alterBot(data, botname);
    }
    async getBots(data) {
        return await this.botsServices.getBots(data);
    }
    startBot() {
        return this.botsServices.startBot();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotsController.prototype, "newBot", null);
__decorate([
    (0, common_1.Patch)(':botname'),
    __param(0, (0, common_1.Param)('botname')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BotsController.prototype, "editBot", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotsController.prototype, "getBots", null);
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BotsController.prototype, "startBot", null);
BotsController = __decorate([
    (0, common_1.Controller)('bots'),
    __metadata("design:paramtypes", [bots_service_1.BotsServices])
], BotsController);
exports.default = BotsController;
//# sourceMappingURL=bots.controller.js.map