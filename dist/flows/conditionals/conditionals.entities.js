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
exports.Conditionals = void 0;
const typeorm_1 = require("typeorm");
let Conditionals = class Conditionals {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Conditionals.prototype, "con_conditional", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Conditionals.prototype, "con_stage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Conditionals.prototype, "con_wordkey", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Conditionals.prototype, "con_response", void 0);
Conditionals = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['con_stage', 'con_wordkey'])
], Conditionals);
exports.Conditionals = Conditionals;
//# sourceMappingURL=conditionals.entities.js.map