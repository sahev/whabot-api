"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordKeysModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wordkeys_controller_1 = require("./wordkeys.controller");
const wordkeys_entities_1 = require("./wordkeys.entities");
const wordkeys_service_1 = require("./wordkeys.service");
let WordKeysModule = class WordKeysModule {
};
WordKeysModule = __decorate([
    (0, common_1.Module)({
        controllers: [wordkeys_controller_1.WordKeysController],
        imports: [typeorm_1.TypeOrmModule.forFeature([wordkeys_entities_1.WordKeys])],
        providers: [wordkeys_service_1.WordKeysServices],
        exports: [wordkeys_service_1.WordKeysServices],
    })
], WordKeysModule);
exports.WordKeysModule = WordKeysModule;
//# sourceMappingURL=wordkeys.module.js.map