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
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor() {
        this.logger = new common_1.Logger('BotGateway');
    }
    afterInit(server) {
        this.logger.log("Inicializado!");
    }
    log(client) {
        var allClients = [];
        this.server.on('connection', function (socket) {
            allClients.push(socket);
            socket.on('disconnect', function () {
                console.log('Got disconnect!');
                var i = allClients.indexOf(socket);
                allClients.splice(i, 1);
            });
        });
    }
    onCreatedChats(entity) {
        console.log('onCreatedChats', entity);
        this.server.emit(`onCreatedChats:${entity.cha_user}`, entity);
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
], ChatGateway.prototype, "server", void 0);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map