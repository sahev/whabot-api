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
exports.WordKeys = void 0;
const typeorm_1 = require("typeorm");
let WordKeys = class WordKeys {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], WordKeys.prototype, "wok_wordkey", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WordKeys.prototype, "wok_stage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WordKeys.prototype, "wok_word", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WordKeys.prototype, "wok_invalidWord", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WordKeys.prototype, "wok_response", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WordKeys.prototype, "wok_workflow", void 0);
WordKeys = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['wok_stage', 'wok_word', 'wok_workflow'])
], WordKeys);
exports.WordKeys = WordKeys;
//# sourceMappingURL=wordkeys.entities.js.map