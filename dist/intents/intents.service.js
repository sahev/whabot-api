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
exports.QueueService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let QueueService = class QueueService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    postInMessageQueue(data) {
        let res;
        try {
            res = this.httpService.post('http://localhost:3002/queue/message/', data);
            return res;
        }
        catch (_a) {
            res = {};
        }
        return res;
    }
    connectMessageQueue() {
        let res;
        try {
            res = this.httpService.post('http://localhost:3002/queue/connect');
            return res;
        }
        catch (_a) {
            res = {};
        }
        return res;
    }
    closeConnection() {
        let res;
        try {
            res = this.httpService.delete('http://localhost:3002/queue/close');
            return res;
        }
        catch (_a) {
            res = {};
        }
        return res;
    }
};
QueueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], QueueService);
exports.QueueService = QueueService;
//# sourceMappingURL=intents.service.js.map