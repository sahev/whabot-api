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
const chats_service_1 = require("./chats.service");
const common_1 = require("@nestjs/common");
const chats_dto_1 = require("./chats.dto");
let ChatsController = class ChatsController {
    constructor(chatsServices) {
        this.chatsServices = chatsServices;
    }
    async setMessage(data) {
        return await this.chatsServices.setMessage(data);
    }
    async getMessages(cha_customer) {
        return await this.chatsServices.getMessages(cha_customer);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chats_dto_1.ChatsDTO]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "setMessage", null);
__decorate([
    (0, common_1.Get)(':cha_customer'),
    __param(0, (0, common_1.Param)('cha_customer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chats_dto_1.ChatsDTO]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getMessages", null);
ChatsController = __decorate([
    (0, common_1.Controller)('chats'),
    __metadata("design:paramtypes", [chats_service_1.ChatsServices])
], ChatsController);
exports.default = ChatsController;
//# sourceMappingURL=chats.controller.js.map