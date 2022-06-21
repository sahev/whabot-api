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
exports.WordKeysController = void 0;
const common_1 = require("@nestjs/common");
const wordkeys_service_1 = require("./wordkeys.service");
const wordkeys_dto_1 = require("./wordkeys.dto");
let WordKeysController = class WordKeysController {
    constructor(wokServices) {
        this.wokServices = wokServices;
    }
    getAllWfs() {
        return this.wokServices.findAll();
    }
    getwordkeyByStage(wok_stage) {
        return this.wokServices.wordkeyByStage(wok_stage);
    }
    newStage(data) {
        return this.wokServices.newWordKey(data);
    }
    deleteWordkey(wok_wordkey) {
        return this.wokServices.deleteWordkey(wok_wordkey);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WordKeysController.prototype, "getAllWfs", null);
__decorate([
    (0, common_1.Get)(':wok_stage'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wordkeys_dto_1.WordKeysDTO]),
    __metadata("design:returntype", void 0)
], WordKeysController.prototype, "getwordkeyByStage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wordkeys_dto_1.WordKeysDTO]),
    __metadata("design:returntype", void 0)
], WordKeysController.prototype, "newStage", null);
__decorate([
    (0, common_1.Delete)(':wok_wordkey'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wordkeys_dto_1.WordKeysDTO]),
    __metadata("design:returntype", void 0)
], WordKeysController.prototype, "deleteWordkey", null);
WordKeysController = __decorate([
    (0, common_1.Controller)('wordkeys'),
    __metadata("design:paramtypes", [wordkeys_service_1.WordKeysServices])
], WordKeysController);
exports.WordKeysController = WordKeysController;
//# sourceMappingURL=wordkeys.controller.js.map