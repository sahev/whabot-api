import { CampaignHistory, Messages } from "../entities/index";
import { Repository } from "typeorm";
import { CampaignHistoryDTO, MessagesDTO } from "./messagesDTO";
export declare class MessagesService {
    private messagesRepository;
    private campaignHistoryRepository;
    private readonly users;
    constructor(messagesRepository: Repository<Messages>, campaignHistoryRepository: Repository<CampaignHistory>);
    newMessage(data: MessagesDTO): Promise<MessagesDTO & Messages>;
    getMessagesType(data: string): Promise<Messages[]>;
    getMessagesShortcuts(data: string): Promise<string>;
    sender(sendMessagesDto: any): Promise<void>;
    execute(client: any[], botId: number, phoneNumber: string, message: string): Promise<any>;
    formatNumber(number: number): string;
    cleanSheet(sheet: any): any;
    setSendedMessage(message: CampaignHistoryDTO): void;
}
