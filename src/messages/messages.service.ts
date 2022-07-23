import { Injectable, BadRequestException, InternalServerErrorException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampaignHistory, Messages } from "../entities/index";
import { Like, Repository } from "typeorm";
import { CampaignHistoryDTO, MessagesDTO } from "./messagesDTO";
import { Utils } from "../utils/utils";
import { Whatsapp } from "venom-bot";
import { formatPhone, getSession, isExists, sendMessage, status } from "src/sessions/sessions.service";

@Injectable()
export class MessagesService {
  private readonly users: Messages[];

  constructor(
    @InjectRepository(Messages) private messagesRepository: Repository<Messages>,
    @InjectRepository(CampaignHistory) private campaignHistoryRepository: Repository<CampaignHistory>
  ) { }

  async newMessage(data: MessagesDTO) {
    const user = await this.messagesRepository.save(data);
    return user;
  }

  async getMessagesType(data: string) {
    if (data === "step") {
      let e = await this.messagesRepository.find({ mes_options: data });
      return e;
    }
    return await this.messagesRepository.find({ mes_type: data });
  }

  async getMessagesShortcuts(data: string) {
    let d = /[0-9]/g;
    let g = /[-\/\\^$*+?.()|[\]{}]/g;

    if (data.match(d)) {
      return data;
    }

    let e = await this.messagesRepository
      .findOne({ mes_shortcut: data })
      .then((res) => {
        if (res) {
          return res.mes_type;
        } else return false;
      });

    let r = await this.messagesRepository.find()

    let s = r.map((s) => {
      if (data.indexOf(s.mes_shortcut) > 0) {
        console.log("log sssssss", s);

        return s.mes_type;
      }
    })

    if (!e) {
      return s.filter(x => { return x !== undefined })[0]
    }
    return e;
  }

  async sender(sendMessagesDto) {
    const columns = this.cleanSheet(sendMessagesDto.columnSheet);
    let clientBot = new Utils().getBrowserData(sendMessagesDto.botId);

    for (let index = 0; index < sendMessagesDto.columnSheet.length; index++) {

      let formatedMessage = sendMessagesDto.message;
      columns.map((itemColumns, idx) => {
        if (sendMessagesDto.message.includes(`{${itemColumns}}`)) {
          formatedMessage = formatedMessage.replace(
            `{${itemColumns}}`,
            sendMessagesDto.columnSheet[index][idx],
          );
        }
      });

        await this.execute(
          clientBot,
          parseInt(sendMessagesDto.botId),
          this.formatNumber(sendMessagesDto.columnSheet[index][0]),
          formatedMessage
        );
    }
    console.log('Quantidade de mensagens processadas: ', sendMessagesDto.columnSheet.length);
  }
  async execute(client: any[], botId: number, phoneNumber: string, message: string): Promise<any> {
    let response = {};
    var sendedmessage = new CampaignHistoryDTO;

    const data = {
      sessionId: botId,
      receiver: phoneNumber,
      message: {
        text: message
      },
      delaySeconds: 3
    }

    console.log(data);
    
    var res = await this.sendMessage(data).then(async (result) => {      
          response = result;
          sendedmessage.cah_bot = data.sessionId;
          sendedmessage.cah_to = data.receiver;
          sendedmessage.cah_message = data.message.text;
          sendedmessage.cah_erro = result.message.startsWith("The receiver number");
          sendedmessage.cah_messageerror = result.message;
        });

    console.log(res, 'res send message');
    this.setSendedMessage(sendedmessage);
  }

  formatNumber(number: number) {
    if (number)
      return number.toString().replace(/\D/g, '');
  }

  cleanSheet(sheet) {
    return sheet.shift().filter(function (i) {
      return i;
    });
  }

  setSendedMessage(message: CampaignHistoryDTO) {
    this.campaignHistoryRepository.save(message)
  }

  async sendMessage(data) {
    const session = getSession(data.sessionId)
    const receiver = formatPhone(data.receiver)
    const message = data.message;
    const botStatus = await status(data.sessionId)
    const delayMs = data.delaySeconds * 1000;

    try {
        const exists = await isExists(session, receiver)
        
        if (botStatus.status == "disconnected")
          return new BadRequestException('The sessionId is disconnected or not exists.')

        if (!exists)
          return new BadRequestException('The receiver number is not exists.')

        await sendMessage(session, receiver, message, delayMs)

        return { status: HttpStatus.OK, message: 'The message has been successfully sent.' }
    } catch (ex) {
        return new InternalServerErrorException(ex, 'Failed to send the message.')
    }
  }
}
