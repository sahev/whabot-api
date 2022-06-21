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
exports.BotsSubscriber = void 0;
const bot_gateway_1 = require("../socket/bot.gateway");
const typeorm_1 = require("typeorm");
const index_1 = require("../entities/index");
const bots_service_1 = require("./bots.service");
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
let BotsSubscriber = class BotsSubscriber {
    constructor(connection, botGateway, botService) {
        this.botGateway = botGateway;
        this.botService = botService;
        connection.subscribers.push(this);
    }
    listenTo() {
        return index_1.Bots;
    }
    afterInsert(event) {
        console.log("afterinsert ", event.entity);
        this.emitCreatedBots(event.entity);
    }
    async emitCreatedBots(entity) {
        console.log("emitCreatedBots ", entity);
        this.botGateway.onCreatedBots(entity);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Socket)
], BotsSubscriber.prototype, "socket", void 0);
BotsSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        bot_gateway_1.BotGateway,
        bots_service_1.BotsServices])
], BotsSubscriber);
exports.BotsSubscriber = BotsSubscriber;
//# sourceMappingURL=bot.subscriber.js.map