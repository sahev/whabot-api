import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { create, Whatsapp } from "venom-bot";
import { setBotStatusDTO } from "../bots/botsDTO";
import { Bots } from "../entities";
import { saveBrowserData } from "./saveBrowserData";

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Bots) public botsRepository: Repository<Bots>
  ) {}

  async getSessionTokenBrowser(data: any) {
    return new Whatsapp(data).getSessionTokenBrowser();
  }

  start(client) {
    new saveBrowserData(client);

    client.onMessage((message) => {
      if (message.body === "Oi") {
        client.sendText(message.from, "auto resposta");
      }
    });
  }

  getClient(data: any, clientName: any) {
    let resp = [];
    data.map((res) => {
      if (res.session === clientName) resp = res;
    });
    return resp;
  }

  getBot(data: string) {
    return this.botsRepository.findOne({ bot_name: data });
  }

  async setBotStatus(botname: string, data: setBotStatusDTO) {
    await this.botsRepository.update({ bot_name: botname }, data);
  }

  async startBot(botname) {
    let strQrCode = "";
    let status = '';

    await create(
      botname,
      (qrcode) => {
        if (qrcode) {
          strQrCode = qrcode;
          throw BadRequestException;
        }
      },
      //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || inChat
      async (statusSession) => {
        status = statusSession;
        await this.setBotStatus(botname, { bot_status: statusSession });
      },
      { logQR: false }
    )
      .then((client) => this.start(client))
      .catch((error) => console.log(error));

    if (status === "notLogged") {
      return strQrCode;
    }
  }
}
