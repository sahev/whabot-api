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
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../entities/index");
const typeorm_2 = require("typeorm");
let TemplatesService = class TemplatesService {
    constructor(templatesRepository) {
        this.templatesRepository = templatesRepository;
    }
    async findAll() {
        return await this.templatesRepository.find();
    }
    delete(data) {
        return this.templatesRepository.delete(data);
    }
    async create(data) {
        const template = await this.templatesRepository.create(data);
        try {
            let checkexists = await this.templatesRepository.findOne({ tem_name: data.tem_name });
            if (checkexists.tem_name === data.tem_name) {
                return new common_1.BadRequestException('Modelo existente');
            }
        }
        catch (_a) {
            await this.templatesRepository.save(template);
            return template;
        }
    }
    async update(template) {
        let checkExists = await this.templatesRepository.findOne({
            tem_name: template.tem_name,
        });
        if (checkExists.tem_template !== template.tem_template)
            return new common_1.BadRequestException("Model name already exists.").getResponse();
        await this.templatesRepository.update({ tem_template: template.tem_template }, template);
        return await this.templatesRepository.findOne({
            tem_name: template.tem_name,
        });
    }
};
TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(index_1.Templates)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TemplatesService);
exports.TemplatesService = TemplatesService;
//# sourceMappingURL=templates.service.js.map