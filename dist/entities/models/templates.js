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
exports.Templates = void 0;
const typeorm_1 = require("typeorm");
let Templates = class Templates {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Templates.prototype, "tem_template", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Templates.prototype, "tem_name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Templates.prototype, "tem_message", void 0);
Templates = __decorate([
    (0, typeorm_1.Entity)()
], Templates);
exports.Templates = Templates;
//# sourceMappingURL=templates.js.map