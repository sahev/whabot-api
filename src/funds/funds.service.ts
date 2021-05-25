import { Injectable, BadRequestException } from "@nestjs/common";
import axios from "axios";
import * as cheerio from "cheerio";
import FundsStructure from "./funds.struct";

@Injectable()
export class FundsService {
  async getFund(fund) {
    const obj = await this.createFundObj(fund);

    console.log(obj);

    return obj;
  }

  async createFundObj(fund) {
    try {
      const html = await axios.get(`https://fiis.com.br/${fund}/`);
      let $ = cheerio.load(html.data);

      const data = [];

      data.push({
        ticker: $(FundsStructure.ticker).text(),
        dividend_yield: $(FundsStructure.dividend_yield).text(),
        last_yield: $(FundsStructure.last_yield).text(),
        net_worth: $(FundsStructure.net_worth).text(),
        equity_value: $(FundsStructure.equity_value).text(),
        administrator: {
          adm_name: $(FundsStructure.adm_name).text(),
          adm_cnpj: $(FundsStructure.adm_cnpj).text(),
          adm_phone: $(FundsStructure.adm_phone).text(),
          adm_email: $(FundsStructure.adm_email).text(),
          adm_site: $(FundsStructure.adm_site).text(),
        },
      });

      return data;
    } catch {
      throw new BadRequestException("Ticker not exists");
    }
  }
}
