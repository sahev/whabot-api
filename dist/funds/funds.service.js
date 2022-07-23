"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const cheerio = require("cheerio");
const funds_struct_1 = require("./funds.struct");
let FundsService = class FundsService {
    async getFund(fund) {
        const obj = await this.createFundObj(fund);
        console.log(obj);
        return obj;
    }
    async onMessage(message) {
        console.log('onmessage ', message);
        switch (true) {
            case /11/.test(message):
                console.log('incluede ', message);
                var index = message.indexOf('11');
                const ticker = message.substring(index - 4).substring(0, 6);
                const fund = await this.getFund(ticker);
                switch (true) {
                    case /administrador/.test(message):
                        return `${fund.ticker}:\n 
              O administrador do fundo é ${fund.administrator.adm_name}; CNPJ: ${fund.administrator.adm_cnpj}.`;
                    case /último dividendo|ultimo dividendo|dy|dividend yield/.test(message):
                        return `${fund.ticker}: ${fund.last_yield} sendo o DY de ${fund.dividend_yield}`;
                    case /valorização|cotação|cotacao|valor atual/.test(message):
                        return `${fund.ticker}:\n
              Cotação atual: ${fund.price.current} com variação de ${fund.price.current_eval}\n
              Variação nos últimos 12 meses foi de ${fund.price.eval_last12month}%;`;
                    case /valor patrimonial por cota|pvp|p\/vp/.test(message):
                        return `${fund.ticker}: O P/VP atual é de ${(parseInt(fund.price.current) / parseInt(fund.equity_value.replace('R$', ''))).toFixed(2)}`;
                    case /resumo/.test(message):
                        return `${fund.ticker}: ${fund.notes}`;
                }
                return "Desculpe, ainda não aprendi sobre sua pergunta 😞";
        }
        return "Digite o código do ativo juntamente da pergunta";
    }
    async createFundObj(fund) {
        try {
            const html = await axios_1.default.get(`https://fiis.com.br/${fund}/`);
            console.log(html, 'htmlllll');
            let $ = cheerio.load(html.data);
            console.log($, '$$$$$$$$');
            return {
                ticker: $(funds_struct_1.default.ticker).text(),
                dividend_yield: $(funds_struct_1.default.dividend_yield).text(),
                last_yield: $(funds_struct_1.default.last_yield).text(),
                net_worth: $(funds_struct_1.default.net_worth).text(),
                equity_value: $(funds_struct_1.default.equity_value).text(),
                notes: $(funds_struct_1.default.notes).text(),
                price: {
                    current: $(funds_struct_1.default.current).text(),
                    current_eval: $(funds_struct_1.default.current_eval).text(),
                    eval_last12month: $(funds_struct_1.default.eval_last12month).text(),
                },
                administrator: {
                    adm_name: $(funds_struct_1.default.adm_name).text(),
                    adm_cnpj: $(funds_struct_1.default.adm_cnpj).text(),
                    adm_phone: $(funds_struct_1.default.adm_phone).text(),
                    adm_email: $(funds_struct_1.default.adm_email).text(),
                    adm_site: $(funds_struct_1.default.adm_site).text(),
                },
            };
        }
        catch (_a) {
            throw new common_1.BadRequestException("Ticker not exists");
        }
    }
};
FundsService = __decorate([
    (0, common_1.Injectable)()
], FundsService);
exports.FundsService = FundsService;
//# sourceMappingURL=funds.service.js.map