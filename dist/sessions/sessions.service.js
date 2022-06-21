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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venom_bot_1 = require("venom-bot");
const entities_1 = require("../entities");
const chats_entities_1 = require("../chats/chats.entities");
const BrowserData_1 = require("./BrowserData");
const bots_service_1 = require("../bots/bots.service");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const stages_entities_1 = require("../flows/stages/stages.entities");
let SessionsService = class SessionsService {
    constructor(botsRepository, messagesRepository, chatsRepository, staRepository) {
        this.botsRepository = botsRepository;
        this.messagesRepository = messagesRepository;
        this.chatsRepository = chatsRepository;
        this.staRepository = staRepository;
    }
    async getSessionTokenBrowser(data) {
        return new venom_bot_1.Whatsapp(data).getSessionTokenBrowser();
    }
    async logout(clientId) {
        let p = BrowserData_1.BrowserData.dataBrowser;
        let b = await this.getBot(clientId);
        console.log(b.bot_status);
        if (b.bot_status !== "notLogged") {
            p.map(async (page) => {
                if (page.session == clientId) {
                    page.close();
                    this.setBotStatus(b.bot_bot, { bot_status: "notLogged" });
                }
                ;
            });
        }
    }
    getClient(data, clientName) {
        let resp = [];
        data.map((res) => {
            if (res.session === clientName)
                resp = res;
        });
        return resp;
    }
    async getBot(botId) {
        return this.botsRepository.findOne({ bot_bot: botId });
    }
    async setBotStatus(botId, data) {
        const obj = { bot_bot: botId, bot_status: data.bot_status };
        await this.botsRepository.update({ bot_bot: botId }, data);
        this.onUpdatedBots(obj);
    }
    onUpdatedBots(data) {
        this.server.emit("onUpdatedBots", data);
    }
    async startBot(botId) {
        let strQrCode = "";
        let status = "";
        await (0, venom_bot_1.create)(botId.toString(), (qrcode) => {
            if (qrcode) {
                strQrCode = qrcode;
                throw common_1.BadRequestException;
            }
        }, async (statusSession) => {
            status = statusSession;
            await this.setBotStatus(botId, { bot_status: statusSession });
        }, {
            logQR: false
        })
            .then((client) => { this.start(client, botId); console.log('bot iniciado'); })
            .catch((error) => console.log(error, 'error start bot'));
        if (status === "notLogged") {
            return strQrCode;
        }
    }
    start(client, botId) {
        new BrowserData_1.BrowserData(client);
        new bots_service_1.BotsServices(this.botsRepository, this.messagesRepository, this.chatsRepository).botInit(client, botId);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SessionsService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("onUpdatedBots"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SessionsService.prototype, "onUpdatedBots", null);
SessionsService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Bots)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Messages)),
    __param(2, (0, typeorm_1.InjectRepository)(chats_entities_1.Chats)),
    __param(3, (0, typeorm_1.InjectRepository)(stages_entities_1.Stages)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SessionsService);
exports.SessionsService = SessionsService;
//# sourceMappingURL=sessions.service.js.map