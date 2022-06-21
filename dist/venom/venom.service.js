"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenomService = void 0;
const common_1 = require("@nestjs/common");
let VenomService = class VenomService {
    getHello() {
        return 'Hello World!';
    }
    startVenom() {
        const venom = require('venom-bot');
        venom
            .create({
            session: 'session-name',
            multidevice: true,
        }, (base64Qrimg, asciiQR, attempts, urlCode) => {
            console.log('Number of attempts to read the qrcode: ', attempts);
            console.log('Terminal qrcode: ', asciiQR);
            console.log('base64 image string qrcode: ', base64Qrimg);
            console.log('urlCode (data-ref): ', urlCode);
        })
            .then((client) => start(client))
            .catch((erro) => {
            console.log(erro);
        });
        function start(client) {
            client.onMessage((message) => {
                if (message.body === 'Hi' && message.isGroupMsg === false) {
                    client
                        .sendText(message.from, 'Welcome Venom 🕷')
                        .then((result) => {
                        console.log('Result: ', result);
                    })
                        .catch((erro) => {
                        console.error('Error when sending: ', erro);
                    });
                }
            });
        }
    }
};
VenomService = __decorate([
    (0, common_1.Injectable)()
], VenomService);
exports.VenomService = VenomService;
//# sourceMappingURL=venom.service.js.map