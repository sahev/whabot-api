"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsModule = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("./sessions.service");
const typeorm_1 = require("@nestjs/typeorm");
const sessions_controller_1 = require("./sessions.controller");
const index_1 = require("../entities/index");
const chats_entities_1 = require("../chats/chats.entities");
const stages_entities_1 = require("../flows/stages/stages.entities");
const workflows_entities_1 = require("../flows/workflows/workflows.entities");
const queue_module_1 = require("../messagequeue/queue.module");
const documents_entities_1 = require("../nlp/documents/documents.entities");
const responses_entities_1 = require("../nlp/responses/responses.entities");
const documents_module_1 = require("../nlp/documents/documents.module");
const responses_module_1 = require("../nlp/responses/responses.module");
let SessionsModule = class SessionsModule {
};
SessionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [sessions_controller_1.default],
        imports: [queue_module_1.QueueModule, documents_module_1.DocumentsModule, responses_module_1.ResponsesModule, typeorm_1.TypeOrmModule.forFeature([documents_entities_1.Documents, responses_entities_1.Responses, index_1.Bots, index_1.Messages, chats_entities_1.Chats, stages_entities_1.Stages, workflows_entities_1.Workflows])],
        providers: [sessions_service_1.SessionsService],
        exports: [sessions_service_1.SessionsService],
    })
], SessionsModule);
exports.SessionsModule = SessionsModule;
//# sourceMappingURL=sessions.module.js.map