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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const documents_entities_1 = require("./documents.entities");
let DocumentsService = class DocumentsService {
    constructor(documentsRepository) {
        this.documentsRepository = documentsRepository;
    }
    findAll() {
        return this.documentsRepository.find();
    }
    async create(data) {
        return this.documentsRepository.create(data);
    }
    async findAllByBot(botId) {
        let res = await this.documentsRepository
            .createQueryBuilder("documents")
            .innerJoin("workflows", "wor", "wor_workflow = doc_workflow and wor_enabled = 1")
            .innerJoin("bots", "bot", "bot_workflow = wor_workflow and bot_enabled = 1")
            .where("bot_bot = :bot", { bot: botId })
            .select()
            .getMany();
        return res;
    }
};
DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documents_entities_1.Documents)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocumentsService);
exports.DocumentsService = DocumentsService;
//# sourceMappingURL=documents.service.js.map