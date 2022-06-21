import { Repository } from "typeorm";
import { Chats } from "../chats/chats.entities";
import { Bots, Messages } from "../entities/index";
import { addBotsDTO, alterBotsDTO, getBotsDTO } from "./botsDTO";
export declare class BotsServices {
    botsRepository: Repository<Bots>;
    messagesRepository: Repository<Messages>;
    chatsRepository: Repository<Chats>;
    constructor(botsRepository: Repository<Bots>, messagesRepository: Repository<Messages>, chatsRepository: Repository<Chats>);
    getBot(data: any): Promise<void>;
    getBots(data: getBotsDTO): Promise<Bots[]>;
    newBot(data: addBotsDTO): Promise<string | object>;
    alterBot(data: alterBotsDTO, botname: string): Promise<Bots>;
    setQrCodeByBot(data: any, botId: number): Promise<Bots>;
    botInit(client: any, botId: any): Promise<void>;
    getBotId(name: any): Promise<Bots>;
    startBot(): Promise<string>;
    start(client: any): void;
}
