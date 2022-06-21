import { Repository } from "typeorm";
import { Chats } from "./chats.entities";
import { ChatsDTO } from "./chats.dto";
export declare class ChatsServices {
    private chatsRepository;
    constructor(chatsRepository: Repository<Chats>);
    setMessage(data: ChatsDTO): Promise<ChatsDTO & Chats>;
    getMessages(cha_customer: ChatsDTO): Promise<Chats[]>;
    onMessage(message: any, botId: any): Promise<string>;
    getNextStage(chatid: any, botId: any): Promise<any>;
    deteleChat(client: any): Promise<void>;
}
