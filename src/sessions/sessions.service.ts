import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { create, Whatsapp } from "venom-bot";
import { setBotStatusDTO } from "../bots/botsDTO";
import { Bots, Messages } from "../entities";
import { BrowserData } from "./BrowserData";
import { BotsServices }  from '../bots/bots.service'
import { Utils } from "../utils";


@Injectable()
export class SessionsService {
  constructor(
    // private readonly connection: Connection,
    @InjectRepository(Bots) public botsRepository: Repository<Bots>,
    @InjectRepository(Messages) private messagesRepository: Repository<Messages>
    
  ) {}

  async getSessionTokenBrowser(data: any) {
    return new Whatsapp(data).getSessionTokenBrowser();
  }

  async logout(clientId) {
    let p = BrowserData.dataBrowser

    p.map(page => {
      if (page.session == clientId)
        page.close();
    })
  }

  getClient(data: any, clientName: any) {
    let resp = [];
    data.map((res) => {
      if (res.session === clientName) resp = res;
    });
    return resp;
  }

  async getBot(botId: number) {
    return this.botsRepository.findOne({ bot_bot: botId });
  }

  async setBotStatus(botId: number, data: setBotStatusDTO) {
    await this.botsRepository.update({ bot_bot: botId }, data);
  }

  async startBot(botId) {
    let strQrCode = "";
    let status = '';


    
    await create(
      botId.toString(),
      (qrcode) => {
        if (qrcode) {
          new BotsServices(this.botsRepository, this.messagesRepository).setQrCodeByBot( { bot_qrcode: qrcode} , botId)
          strQrCode = qrcode;
          throw BadRequestException;
        }
      },
      //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || inChat || chatsAvailable
      async (statusSession) => {
        status = statusSession;
        console.log('status', status);
        
        await this.setBotStatus(botId, { bot_status: statusSession });
      },
      { logQR: false }
    )
      .then((client) => this.start(client))
      .catch((error) => console.log(error));

    if (status === "notLogged") {
      return strQrCode;
    }
  }

  start(client) {
    new BrowserData(client);

    new BotsServices(this.botsRepository, this.messagesRepository).botInit(client);

    // client.onMessage((message) => {
    //   if (message.body === "Oi") {
    //     client.sendText(message.from, "auto resposta");
    //   }
    // });
  }
}
