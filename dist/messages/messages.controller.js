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
const messages_service_1 = require("./messages.service");
const messagesDTO_1 = require("./messagesDTO");
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils/utils");
let MessagesController = class MessagesController {
    constructor(messagesServices) {
        this.messagesServices = messagesServices;
    }
    async sendMessage(data) {
        let response = {};
        let bot = new utils_1.Utils().getBrowserData(data.client);
        try {
            await bot
                .sendText(data.number + "@c.us", data.text)
                .then((result) => {
                response = result;
            })
                .catch((erro) => {
                console.error("Error when sending: ", erro);
            });
            return response;
        }
        catch (_a) {
            return new common_1.BadRequestException("Bot not started or not found").getResponse();
        }
    }
    async newMessage(data) {
        return this.messagesServices.newMessage(data);
    }
    async sendMessages(sendMessagesDto) {
        this.messagesServices.sender(sendMessagesDto);
    }
};
__decorate([
    (0, common_1.Post)("send/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messagesDTO_1.sendMessagesDTO]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)("message/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messagesDTO_1.MessagesDTO]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "newMessage", null);
__decorate([
    (0, common_1.Post)('messages/send'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [messagesDTO_1.SendMessagesCampaignDTO]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "sendMessages", null);
MessagesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesController);
exports.default = MessagesController;
//# sourceMappingURL=messages.controller.js.map