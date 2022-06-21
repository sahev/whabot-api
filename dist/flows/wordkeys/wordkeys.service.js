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
exports.WordKeysServices = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wordkeys_entities_1 = require("./wordkeys.entities");
let WordKeysServices = class WordKeysServices {
    constructor(wordkeysRepository) {
        this.wordkeysRepository = wordkeysRepository;
    }
    async findAll() {
        return await this.wordkeysRepository.find();
    }
    async newWordKey(data) {
        try {
            return await this.wordkeysRepository.save(data);
        }
        catch (_a) {
            return new common_1.BadRequestException("Word key already exists for the same stage.").getResponse();
        }
    }
    async wordkeyByStage(wok_stage) {
        return await this.wordkeysRepository.find(wok_stage);
    }
    async deleteWordkey(wok_wordkey) {
        return await this.wordkeysRepository.delete(wok_wordkey);
    }
};
WordKeysServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wordkeys_entities_1.WordKeys)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WordKeysServices);
exports.WordKeysServices = WordKeysServices;
//# sourceMappingURL=wordkeys.service.js.map