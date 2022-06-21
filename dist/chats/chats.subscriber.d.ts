import { ChatGateway } from '../socket/chat.gateway';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Chats } from './chats.entities';
import { ChatsServices } from './chats.service';
export declare class ChatsSubscriber implements EntitySubscriberInterface<Chats> {
    private chatGateway;
    private chatService;
    constructor(connection: Connection, chatGateway: ChatGateway, chatService: ChatsServices);
    listenTo(): typeof Chats;
    afterInsert(event: InsertEvent<any>): void;
    afterUpdate(event: InsertEvent<any>): void;
    emitCreatedChats(entity: any): Promise<void>;
}
