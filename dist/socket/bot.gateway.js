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
exports.BotGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let BotGateway = class BotGateway {
    constructor() {
        this.logger = new common_1.Logger("BotGateway");
    }
    afterInit(server) {
        this.logger.log("Inicializado!");
    }
    onCreatedBots(entity) {
        console.log("onCreatedBots", entity);
        this.server.emit(`onCreatedBots:${entity.bot_user}`, entity);
    }
    onUpdatedBots(data) {
        this.server.emit('onUpdatedBots', data);
    }
    handleConnection(client) {
        this.logger.log(`client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`client disconnected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BotGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('onUpdatedBots'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BotGateway.prototype, "onUpdatedBots", null);
BotGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], BotGateway);
exports.BotGateway = BotGateway;
//# sourceMappingURL=bot.gateway.js.map