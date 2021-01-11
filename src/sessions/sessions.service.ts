import { Injectable, BadRequestException } from "@nestjs/common";
import { Whatsapp } from "venom-bot";
import { saveBrowserData } from "./saveBrowserData";

@Injectable()
export class SessionsService {
  constructor() {}

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
}
