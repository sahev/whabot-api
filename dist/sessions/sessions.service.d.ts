import { Repository } from "typeorm";
import { setBotStatusDTO } from "../bots/botsDTO";
import { Bots, Messages } from "../entities";
import { Chats } from '../chats/chats.entities';
import { Server } from "socket.io";
import { Stages } from "../flows/stages/stages.entities";
export declare class SessionsService {
    botsRepository: Repository<Bots>;
    private messagesRepository;
    chatsRepository: Repository<Chats>;
    staRepository: Repository<Stages>;
    server: Server;
    constructor(botsRepository: Repository<Bots>, messagesRepository: Repository<Messages>, chatsRepository: Repository<Chats>, staRepository: Repository<Stages>);
    getSessionTokenBrowser(data: any): Promise<import("venom-bot/dist/config/tokenSession.config").tokenSession>;
    logout(clientId: any): Promise<void>;
    getClient(data: any, clientName: any): any[];
    getBot(botId: number): Promise<Bots>;
    setBotStatus(botId: number, data: setBotStatusDTO): Promise<void>;
    onUpdatedBots(data: {}): void;
    startBot(botId: any): Promise<string>;
    start(client: any, botId: any): void;
}
