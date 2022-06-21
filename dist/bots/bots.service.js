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
exports.BotsServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chats_service_1 = require("../chats/chats.service");
const chats_entities_1 = require("../chats/chats.entities");
const index_1 = require("../entities/index");
const funds_service_1 = require("../funds/funds.service");
const venom_bot_1 = require("venom-bot");
let BotsServices = class BotsServices {
    constructor(botsRepository, messagesRepository, chatsRepository) {
        this.botsRepository = botsRepository;
        this.messagesRepository = messagesRepository;
        this.chatsRepository = chatsRepository;
    }
    async getBot(data) {
        this.botsRepository.findOne({ bot_name: data });
    }
    async getBots(data) {
        return await this.botsRepository.find({ bot_user: data.bot_user });
    }
    async newBot(data) {
        try {
            let checkexists = await this.botsRepository.findOne({
                bot_name: data.bot_name,
            });
            if (checkexists.bot_name === data.bot_name) {
                return new common_1.BadRequestException("Bot exists").getResponse();
            }
        }
        catch (_a) {
            await this.botsRepository.save(data);
            return data;
        }
    }
    async alterBot(data, botname) {
        await this.botsRepository.update({ bot_name: botname }, data);
        return await this.botsRepository.findOne({
            bot_name: data.bot_name,
        });
    }
    async setQrCodeByBot(data, botId) {
        await this.botsRepository.update({ bot_bot: botId }, data);
        return await this.botsRepository.findOne({
            bot_bot: botId,
        });
    }
    async botInit(client, botId) {
        client.onMessage(async (message) => {
            let bot = await this.botsRepository.findOne({ bot_bot: botId });
            if (!message.isGroupMsg && message.chatId == '5511981568415@c.us' || message.chatId == '5511997035927@c.us' || message.chatId == '5511970606771@c.us') {
                switch (bot.bot_type) {
                    case 1:
                        console.log('origem: ', message.from, 'destino: ', message.to, 'receive message: ', message.body);
                        let workResponse = await new chats_service_1.ChatsServices(this.chatsRepository).onMessage(message, botId);
                        client.sendText(message.from, workResponse);
                        break;
                    case 2:
                        let fundResponse = await new funds_service_1.FundsService().onMessage(message.body);
                        console.log('fundresp ', fundResponse);
                        client.sendText(message.from, fundResponse);
                        break;
                    case 3:
                        console.log('origem: ', message.from, 'destino: ', message.to, 'receive message: ', message.body);
                        break;
                }
            }
        });
    }
    async getBotId(name) {
        return await (0, typeorm_2.getManager)()
            .createQueryBuilder(index_1.Bots, "bots")
            .where("bot_name = :data", { data: name })
            .getOne();
    }
    async startBot() {
        let strQrCode = "";
        let status = "";
        await (0, venom_bot_1.create)({
            session: 'Test',
            multidevice: false,
        })
            .then((client) => this.start(client))
            .catch((error) => console.log(error));
        if (status === "notLogged") {
            return strQrCode;
        }
    }
    start(client) {
        client.onMessage((message) => {
            if (message.body === 'Hi' && message.isGroupMsg === false) {
                client
                    .sendText(message.from, 'Welcome Venom 🕷')
                    .then((result) => {
                    console.log('Result: ', result);
                })
                    .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
            }
        });
    }
};
BotsServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(index_1.Bots)),
    __param(1, (0, typeorm_1.InjectRepository)(index_1.Messages)),
    __param(2, (0, typeorm_1.InjectRepository)(chats_entities_1.Chats)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BotsServices);
exports.BotsServices = BotsServices;
//# sourceMappingURL=bots.service.js.map