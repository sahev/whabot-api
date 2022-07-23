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
exports.ResponsesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const responses_entities_1 = require("./responses.entities");
let ResponsesService = class ResponsesService {
    constructor(responsesRepository) {
        this.responsesRepository = responsesRepository;
    }
    findAll() {
        return this.responsesRepository.find();
    }
    async create(data) {
        return await this.responsesRepository.create(data);
    }
    async findAllByBot(botId) {
        let res = await this.responsesRepository
            .createQueryBuilder("responses")
            .innerJoin("documents", "doc", "res_intent = doc_intent")
            .innerJoin("workflows", "wor", "doc_workflow = wor_workflow")
            .innerJoin("bots", "bot", "bot_workflow = wor_workflow and bot_enabled = 1")
            .where("bot_bot = :bot", { bot: botId })
            .andWhere("wor_enabled = 1")
            .select()
            .getMany();
        return res;
    }
};
ResponsesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(responses_entities_1.Responses)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResponsesService);
exports.ResponsesService = ResponsesService;
//# sourceMappingURL=responses.service.js.map