  
import { ChatGateway } from '../socket/chat.gateway';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  import { Chats } from '../entities/index';
import { ChatsServices } from './chats.service';
  
  @EventSubscriber()
  export class ChatsSubscriber implements EntitySubscriberInterface<Chats> {
    constructor(connection: Connection, private chatGateway: ChatGateway, private chatService: ChatsServices) {
      connection.subscribers.push(this);
    }
  
    listenTo() {
      return Chats;
    }

    afterInsert(event: InsertEvent<any>): void{    
      console.log('afterinsert ', event.entity);
          
      this.emitCreatedChats(event.entity);
    }

    afterUpdate(event: InsertEvent<any>): void {
      this.emitCreatedChats(event.entity.cha_user);
    }

    async emitCreatedChats(entity: any): Promise<void> {
        const event = await this.chatService.getMessages(entity.cha_user);

        this.chatGateway.onCreatedChats(
          entity
        );
      }
    
  }