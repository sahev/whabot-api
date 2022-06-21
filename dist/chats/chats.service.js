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
exports.ChatsServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chats_entities_1 = require("./chats.entities");
let ChatsServices = class ChatsServices {
    constructor(chatsRepository) {
        this.chatsRepository = chatsRepository;
    }
    async setMessage(data) {
        let r = await this.chatsRepository.save(data);
        return r;
    }
    async getMessages(cha_customer) {
        let r = await this.chatsRepository.find(cha_customer);
        return r;
    }
    async onMessage(message, botId) {
        let response = '';
        const nextStage = await this.getNextStage(message.chatId, botId);
        let data = {
            cha_message: message.body,
            cha_chatId: message.chatId,
            cha_stage: nextStage.nextStage,
            cha_bot: botId,
        };
        try {
            await this.chatsRepository.save(data);
            response = nextStage.wok_response;
        }
        catch (_a) {
            if (message.body.includes(nextStage.wok_word)) {
                await this.chatsRepository.update({ cha_chatId: message.chatId, cha_bot: botId }, data);
                response = nextStage.wok_response;
            }
            else if (nextStage.actualStage > 0) {
                response = nextStage.wok_invalidWord;
            }
            else
                response = nextStage.wok_word;
        }
        if (!response) {
            response = nextStage.wok_word;
        }
        console.log(`botid: ${botId}; recebido: ${message.body}; esperado: ${nextStage.wok_word}; resposta: ${response}; actualStage: ${nextStage.actualStage}; nextStage: ${nextStage.nextStage} `);
        return response;
    }
    async getNextStage(chatid, botId) {
        let nextStage = await this.chatsRepository
            .createQueryBuilder("chats")
            .innerJoinAndSelect("Word_keys", "wk", "cha_stage = wok_stage")
            .innerJoinAndSelect("stages", "sta", "cha_stage = sta_parent")
            .innerJoinAndSelect("workflows", "wor", "wor_workflow = sta_workflow and wor_enabled = 1 and wok_workflow = wor_workflow AND wok_workflow = wor_workflow AND cha_bot = wor_bot")
            .where("cha_bot = :bot", { bot: botId })
            .andWhere("cha_chatId = :chatid", { chatid: chatid })
            .select([
            "cha_stage as actualStage",
            "sta_stage as nextStage",
            "wok_word",
            "wok_response",
            "wok_invalidWord"
        ])
            .getRawOne();
        if (nextStage == undefined) {
            let nextStage = await this.chatsRepository.query(`
      SELECT sta_stage as nextStage, wok_word, wok_response FROM chats
      RIGHT JOIN stages ON sta_stage = cha_stage
      RIGHT JOIN workflows ON sta_workflow = wor_workflow AND wor_enabled = 1 
      RIGHT JOIN bots ON wor_workflow = bot_workflow
      RIGHT JOIN word_keys ON wok_stage = sta_parent and wok_workflow = wor_workflow AND wok_workflow = wor_workflow
      WHERE sta_parent = 0 AND bot_bot = ${botId}
      `);
            console.log("new message: ", nextStage);
            return nextStage[0];
        }
        else {
            console.log("exists message: ", nextStage);
            return nextStage;
        }
    }
    async deteleChat(client) {
        client.deleteChat(client.chatId);
    }
};
ChatsServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chats_entities_1.Chats)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatsServices);
exports.ChatsServices = ChatsServices;
//# sourceMappingURL=chats.service.js.map