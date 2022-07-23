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
const sessions_service_1 = require("./sessions.service");
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils/utils");
let SessionsController = class SessionsController {
    constructor(sessionsServices) {
        this.sessionsServices = sessionsServices;
    }
    async logout(id) {
        await this.sessionsServices.logout(id);
    }
    async getTokenBrowser(data) {
        let response = {};
        let bot = new utils_1.Utils().getBrowserData(data);
        try {
            await bot
                .getSessionTokenBrowser()
                .then((result) => {
                response = result;
            })
                .catch((erro) => {
                console.error("Error getting token: ", erro);
            });
            return response;
        }
        catch (_a) {
            return new common_1.BadRequestException("Bot not started or not found").getResponse();
        }
    }
    async getQrCode(data) {
        let databot = await this.sessionsServices.getBot(data.botId);
        return { string: await this.sessionsServices.startBot(data.botId) };
    }
    async getBotStatus(botId) {
        return await this.sessionsServices.getBotStatus(parseInt(botId));
    }
};
__decorate([
    (0, common_1.Post)("logout/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)("gettoken/:name"),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getTokenBrowser", null);
__decorate([
    (0, common_1.Post)("start/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getQrCode", null);
__decorate([
    (0, common_1.Get)("botstatus/:botId"),
    __param(0, (0, common_1.Param)("botId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getBotStatus", null);
SessionsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sessions_service_1.SessionsService])
], SessionsController);
exports.default = SessionsController;
//# sourceMappingURL=sessions.controller.js.map