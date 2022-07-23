import { Repository } from "typeorm";
import { setBotStatusDTO } from "../bots/botsDTO";
import { Bots, Messages } from "../entities";
import { Chats } from '../chats/chats.entities';
import { Server } from "socket.io";
import { Stages } from "../flows/stages/stages.entities";
import { QueueService } from "src/messagequeue/queue.service";
import { Documents } from "src/nlp/documents/documents.entities";
import { DocumentsService } from "src/nlp/documents/documents.service";
import { ResponsesService } from "src/nlp/responses/responses.service";
export declare class SessionsService {
    botsRepository: Repository<Bots>;
    private messagesRepository;
    chatsRepository: Repository<Chats>;
    staRepository: Repository<Stages>;
    documentsRepository: Repository<Documents>;
    private queueService;
    private documentsService;
    private responsesService;
    server: Server;
    constructor(botsRepository: Repository<Bots>, messagesRepository: Repository<Messages>, chatsRepository: Repository<Chats>, staRepository: Repository<Stages>, documentsRepository: Repository<Documents>, queueService: QueueService, documentsService: DocumentsService, responsesService: ResponsesService);
    getSessionTokenBrowser(data: any): Promise<import("venom-bot/dist/config/tokenSession.config").tokenSession>;
    logout(clientId: any): Promise<void>;
    getClient(data: any, clientName: any): any[];
    getBot(botId: number): Promise<Bots>;
    setBotStatus(botId: number, data: setBotStatusDTO): Promise<void>;
    onUpdatedBots(data: {}): void;
    qrCodeStringUpdate(data: {}): void;
    startBot(botId: any): Promise<{
        status: any;
    }>;
    start(client: any, botId: any): void;
    getBotStatus(botId: any): Promise<{
        status: any;
    }>;
    createSession(sessionId: any, isLegacy?: boolean, res?: any): Promise<{
        status: any;
    }>;
}
declare const isSessionExists: (sessionId: any) => boolean;
declare const getSession: (sessionId: any) => any;
declare const deleteSession: (sessionId: any, isLegacy?: boolean) => void;
declare const getChatList: (sessionId: any, isGroup?: boolean) => any;
declare const isExists: (session: any, jid: any, isGroup?: boolean) => Promise<any>;
declare const sendMessage: (session: any, receiver: any, message: any, delayMs?: number) => Promise<any>;
declare const formatPhone: (phone: any) => any;
declare const formatGroup: (group: any) => any;
declare const cleanup: () => void;
declare const status: (sessionId: any) => Promise<{
    status: any;
}>;
export { status, isSessionExists, getSession, deleteSession, getChatList, isExists, sendMessage, formatPhone, formatGroup, cleanup, };
