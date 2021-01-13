import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { create, Whatsapp } from "venom-bot";
import { setBotStatusDTO } from "../bots/botsDTO";
import { Bots, Carts, Messages, Products, Workflows } from "../entities";
import { saveBrowserData } from "./saveBrowserData";
import { BotsServices }  from '../bots/bots.service'

@Injectable()
export class SessionsService {
  constructor(
    // private readonly connection: Connection,
    @InjectRepository(Bots) public botsRepository: Repository<Bots>,
    @InjectRepository(Products) public productsRepository: Repository<Products>,
    @InjectRepository(Workflows) public workflowsRepository: Repository<Workflows>,
    @InjectRepository(Carts) private CartsRepository: Repository<Carts>
    
  ) {}

  async getSessionTokenBrowser(data: any) {
    return new Whatsapp(data).getSessionTokenBrowser();
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

  start(client) {
    new saveBrowserData(client);

    new BotsServices(this.botsRepository, this.productsRepository, this.workflowsRepository, this.CartsRepository).botInit(client);

    // client.onMessage((message) => {
    //   if (message.body === "Oi") {
    //     client.sendText(message.from, "auto resposta");
    //   }
    // });
  }
}
