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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsSubscriber = void 0;
const chat_gateway_1 = require("../socket/chat.gateway");
const typeorm_1 = require("typeorm");
const chats_entities_1 = require("./chats.entities");
const chats_service_1 = require("./chats.service");
let ChatsSubscriber = class ChatsSubscriber {
    constructor(connection, chatGateway, chatService) {
        this.chatGateway = chatGateway;
        this.chatService = chatService;
        connection.subscribers.push(this);
    }
    listenTo() {
        return chats_entities_1.Chats;
    }
    afterInsert(event) {
        console.log('afterinsert ', event.entity);
        this.emitCreatedChats(event.entity);
    }
    afterUpdate(event) {
        this.emitCreatedChats(event.entity.cha_user);
    }
    async emitCreatedChats(entity) {
        const event = await this.chatService.getMessages(entity.cha_user);
        this.chatGateway.onCreatedChats(entity);
    }
};
ChatsSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.Connection, chat_gateway_1.ChatGateway, chats_service_1.ChatsServices])
], ChatsSubscriber);
exports.ChatsSubscriber = ChatsSubscriber;
//# sourceMappingURL=chats.subscriber.js.map