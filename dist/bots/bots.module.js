"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotsModule = void 0;
const common_1 = require("@nestjs/common");
const bots_service_1 = require("./bots.service");
const bots_controller_1 = require("./bots.controller");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../entities/index");
const chats_entities_1 = require("../chats/chats.entities");
const socket_module_1 = require("../socket/socket.module");
const bot_subscriber_1 = require("./bot.subscriber");
const stages_entities_1 = require("../flows/stages/stages.entities");
const workflows_entities_1 = require("../flows/workflows/workflows.entities");
let BotsModule = class BotsModule {
};
BotsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bots_controller_1.default],
        imports: [typeorm_1.TypeOrmModule.forFeature([index_1.Bots, index_1.Messages, chats_entities_1.Chats, stages_entities_1.Stages, workflows_entities_1.Workflows]), socket_module_1.GatewayModule],
        providers: [bots_service_1.BotsServices, bot_subscriber_1.BotsSubscriber],
        exports: [bots_service_1.BotsServices],
    })
], BotsModule);
exports.BotsModule = BotsModule;
//# sourceMappingURL=bots.module.js.map