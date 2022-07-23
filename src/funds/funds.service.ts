import { Injectable, BadRequestException } from "@nestjs/common";
import axios from "axios";
import * as cheerio from "cheerio";
import FundsStructure from "./funds.struct";
import { FundsStructureDTO } from "./fundsDTO";

@Injectable()
export class FundsService {
  async getFund(fund) {
    const obj = await this.createFundObj(fund);
    console.log(obj);
    return obj;
  }

  async onMessage(message: any) {
    console.log('onmessage ', message);
    switch (true) {
      case /11/.test(message):
        console.log('incluede ', message);
        var index = message.indexOf('11');
        const ticker = message.substring(index - 4).substring(0, 6)
        const fund = await this.getFund(ticker)
        
        switch (true) {
          case /administrador/.test(message):
            return `${fund.ticker}:\n 
              O administrador do fundo é ${fund.administrator.adm_name}; CNPJ: ${fund.administrator.adm_cnpj}.`
            
          case /último dividendo|ultimo dividendo|dy|dividend yield/.test(message):
            return `${fund.ticker}: ${fund.last_yield} sendo o DY de ${fund.dividend_yield}`
          
          case /valorização|cotação|cotacao|valor atual/.test(message):
            return `${fund.ticker}:\n
              Cotação atual: ${fund.price.current} com variação de ${fund.price.current_eval}\n
              Variação nos últimos 12 meses foi de ${fund.price.eval_last12month}%;`
          
          case /valor patrimonial por cota|pvp|p\/vp/.test(message):
            return `${fund.ticker}: O P/VP atual é de ${(parseInt(fund.price.current) / parseInt(fund.equity_value.replace('R$', ''))).toFixed(2)}`

          case /resumo/.test(message):
            return `${fund.ticker}: ${fund.notes}`;
        }
      return "Desculpe, ainda não aprendi sobre sua pergunta 😞"
    }
    return "Digite o código do ativo juntamente da pergunta"
   }

  async createFundObj(fund) {
    try {
      const html = await axios.get(`https://fiis.com.br/${fund}/`);
      console.log(html, 'htmlllll');
      
      let $ = cheerio.load(html.data);
console.log($, '$$$$$$$$');

      return <FundsStructureDTO> {
        ticker: $(FundsStructure.ticker).text(),
        dividend_yield: $(FundsStructure.dividend_yield).text(),
        last_yield: $(FundsStructure.last_yield).text(),
        net_worth: $(FundsStructure.net_worth).text(),
        equity_value: $(FundsStructure.equity_value).text(),
        notes: $(FundsStructure.notes).text(),
        price: {
          current: $(FundsStructure.current).text(),
          current_eval: $(FundsStructure.current_eval).text(),
          eval_last12month: $(FundsStructure.eval_last12month).text(),
        },
        administrator: {
          adm_name: $(FundsStructure.adm_name).text(),
          adm_cnpj: $(FundsStructure.adm_cnpj).text(),
          adm_phone: $(FundsStructure.adm_phone).text(),
          adm_email: $(FundsStructure.adm_email).text(),
          adm_site: $(FundsStructure.adm_site).text(),
        },
      }
    } catch {
      throw new BadRequestException("Ticker not exists");
    }
  }
}
