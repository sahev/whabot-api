"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const sessions_module_1 = require("./sessions/sessions.module");
const index_1 = require("./entities/index");
const messages_module_1 = require("./messages/messages.module");
const bots_module_1 = require("./bots/bots.module");
const chats_module_1 = require("./chats/chats.module");
const socket_module_1 = require("./socket/socket.module");
const workflows_module_1 = require("./flows/workflows/workflows.module");
const stages_module_1 = require("./flows/stages/stages.module");
const conditionals_module_1 = require("./flows/conditionals/conditionals.module");
const links_module_1 = require("./flows/links/links.module");
const wordkeys_module_1 = require("./flows/wordkeys/wordkeys.module");
const funds_module_1 = require("./funds/funds.module");
const templates_module_1 = require("./templates/templates.module");
const links_entities_1 = require("./flows/links/links.entities");
const workflows_entities_1 = require("./flows/workflows/workflows.entities");
const stages_entities_1 = require("./flows/stages/stages.entities");
const conditionals_entities_1 = require("./flows/conditionals/conditionals.entities");
const wordkeys_entities_1 = require("./flows/wordkeys/wordkeys.entities");
const chats_entities_1 = require("./chats/chats.entities");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            sessions_module_1.SessionsModule,
            messages_module_1.MessagesModule,
            bots_module_1.BotsModule,
            chats_module_1.ChatsModule,
            socket_module_1.GatewayModule,
            workflows_module_1.WorkflowsModule,
            stages_module_1.StagesModule,
            conditionals_module_1.ConditionalsModule,
            wordkeys_module_1.WordKeysModule,
            funds_module_1.FundsModule,
            links_module_1.LinksModule,
            templates_module_1.TemplatesModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'whabot',
                charset: "utf8mb4_unicode_ci",
                entities: [index_1.Templates, index_1.CampaignHistory, index_1.Users, index_1.Sessions, index_1.Messages, index_1.Bots, chats_entities_1.Chats, workflows_entities_1.Workflows, stages_entities_1.Stages, conditionals_entities_1.Conditionals, wordkeys_entities_1.WordKeys, links_entities_1.Links],
                synchronize: true,
                migrations: ["src/database/migrations/*.ts"],
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map