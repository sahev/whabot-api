import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Whatsapp } from "venom-bot";
import { Bots } from "../entities";
import { saveBrowserData } from "./saveBrowserData";

@Injectable()
export class SessionsService {
  constructor(@InjectRepository(Bots) private botsRepository: Repository<Bots>) {}

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
    return this.botsRepository.findOne({bot_name: data})
  }
}
