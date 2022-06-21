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
exports.botMessagesDTO = exports.Bots = void 0;
const typeorm_1 = require("typeorm");
let Bots = class Bots {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Bots.prototype, "bot_bot", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bots.prototype, "bot_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Bots.prototype, "bot_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bots.prototype, "bot_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'notLogged' }),
    __metadata("design:type", String)
], Bots.prototype, "bot_status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bots.prototype, "bot_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Bots.prototype, "bot_workflow", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Bots.prototype, "bot_type", void 0);
Bots = __decorate([
    (0, typeorm_1.Entity)()
], Bots);
exports.Bots = Bots;
let botMessagesDTO = class botMessagesDTO {
};
botMessagesDTO = __decorate([
    (0, typeorm_1.Entity)()
], botMessagesDTO);
exports.botMessagesDTO = botMessagesDTO;
//# sourceMappingURL=bots.js.map