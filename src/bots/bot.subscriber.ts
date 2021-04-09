import { BotGateway } from "../socket/bot.gateway";
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { Bots } from "../entities/index";
import { BotsServices } from "./bots.service";

import { Socket, Server } from "socket.io";
import { MessageBody, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";

@EventSubscriber()
export class BotsSubscriber implements EntitySubscriberInterface<Bots> {
  constructor(
    connection: Connection,
    private botGateway: BotGateway,
    private botService: BotsServices
  ) {
    connection.subscribers.push(this);
  }
  @WebSocketServer() socket: Socket
  
  listenTo() {
    return Bots;
  }

  afterInsert(event: InsertEvent<any>): void {
    console.log("afterinsert ", event.entity);

    this.emitCreatedBots(event.entity);
  }

  async emitCreatedBots(entity: any): Promise<void> {
    console.log("emitCreatedBots ", entity);

    this.botGateway.onCreatedBots(entity);
  }
  
}
