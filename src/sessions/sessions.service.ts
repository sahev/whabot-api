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
    @InjectRepository(Carts) private CartsRepository: Repository<Carts>,
    @InjectRepository(Messages) private messagesRepository: Repository<Messages>
    
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
          new BotsServices(this.botsRepository, this.productsRepository, this.workflowsRepository, this.CartsRepository, this.messagesRepository).setQrCodeByBot( { bot_qrcode: qrcode} , botId)
          strQrCode = qrcode;
          throw BadRequestException;
        }
      },
      //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || inChat || chatsAvailable
      async (statusSession) => {
        status = statusSession;
        await this.setBotStatus(botId, { bot_status: statusSession });
      },
      { logQR: false }
    )
      .then((client) => this.start(client))
      .catch((error) => console.log(error));


// function start(client) {
//   client.onMessage((message) => {
//     if (message.body === 'Hi' && message.isGroupMsg === false) {
//       client
//         .sendText(message.from, 'Welcome Venom 🕷')
//         .then((result) => {
//           console.log('Result: ', result); //return object success
//         })
//         .catch((erro) => {
//           console.error('Error when sending: ', erro); //return object error
//         });
//     }
//   });
// }


    if (status === "notLogged") {
      return strQrCode;
    }
  }

  start(client) {
    new saveBrowserData(client);

    new BotsServices(this.botsRepository, this.productsRepository, this.workflowsRepository, this.CartsRepository, this.messagesRepository).botInit(client);

    // client.onMessage((message) => {
    //   if (message.body === "Oi") {
    //     client.sendText(message.from, "auto resposta");
    //   }
    // });
  }
}
