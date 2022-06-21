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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../entities/index");
const typeorm_2 = require("typeorm");
const messagesDTO_1 = require("./messagesDTO");
const utils_1 = require("../utils/utils");
let MessagesService = class MessagesService {
    constructor(messagesRepository, campaignHistoryRepository) {
        this.messagesRepository = messagesRepository;
        this.campaignHistoryRepository = campaignHistoryRepository;
    }
    async newMessage(data) {
        const user = await this.messagesRepository.save(data);
        return user;
    }
    async getMessagesType(data) {
        if (data === "step") {
            let e = await this.messagesRepository.find({ mes_options: data });
            return e;
        }
        return await this.messagesRepository.find({ mes_type: data });
    }
    async getMessagesShortcuts(data) {
        let d = /[0-9]/g;
        let g = /[-\/\\^$*+?.()|[\]{}]/g;
        if (data.match(d)) {
            return data;
        }
        let e = await this.messagesRepository
            .findOne({ mes_shortcut: data })
            .then((res) => {
            if (res) {
                return res.mes_type;
            }
            else
                return false;
        });
        let r = await this.messagesRepository.find();
        let s = r.map((s) => {
            if (data.indexOf(s.mes_shortcut) > 0) {
                console.log("log sssssss", s);
                return s.mes_type;
            }
        });
        if (!e) {
            return s.filter(x => { return x !== undefined; })[0];
        }
        return e;
    }
    async sender(sendMessagesDto) {
        const columns = this.cleanSheet(sendMessagesDto.columnSheet);
        let clientBot = new utils_1.Utils().getBrowserData(sendMessagesDto.botId);
        for (let index = 0; index < sendMessagesDto.columnSheet.length; index++) {
            let formatedMessage = sendMessagesDto.message;
            columns.map((itemColumns, idx) => {
                if (sendMessagesDto.message.includes(`{${itemColumns}}`)) {
                    formatedMessage = formatedMessage.replace(`{${itemColumns}}`, sendMessagesDto.columnSheet[index][idx]);
                }
            });
            await this.execute(clientBot, parseInt(sendMessagesDto.botId), this.formatNumber(sendMessagesDto.columnSheet[index][0]), formatedMessage);
        }
        console.log('Quantidade de mensagens processadas: ', sendMessagesDto.columnSheet.length);
    }
    async execute(client, botId, phoneNumber, message) {
        let response = {};
        var sendedmessage = new messagesDTO_1.CampaignHistoryDTO;
        try {
            await client
                .sendText("55" + phoneNumber + "@c.us", message)
                .then((result) => {
                response = result;
                sendedmessage.cah_bot = botId;
                sendedmessage.cah_to = result.to.remote.user;
                sendedmessage.cah_message = result.text;
                sendedmessage.cah_erro = false;
            })
                .catch((erro) => {
                sendedmessage.cah_bot = botId;
                sendedmessage.cah_to = erro.to.replace('@c.us', '');
                sendedmessage.cah_message = message;
                sendedmessage.cah_messageerror = erro.text;
                sendedmessage.cah_erro = true;
            });
            this.setSendedMessage(sendedmessage);
            return response;
        }
        catch (_a) {
            return new common_1.BadRequestException("Bot not started or not found").getResponse();
        }
    }
    formatNumber(number) {
        if (number)
            return number.toString().replace(/\D/g, '');
    }
    cleanSheet(sheet) {
        return sheet.shift().filter(function (i) {
            return i;
        });
    }
    setSendedMessage(message) {
        this.campaignHistoryRepository.save(message);
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(index_1.Messages)),
    __param(1, (0, typeorm_1.InjectRepository)(index_1.CampaignHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map