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

  afterUpdate(event: UpdateEvent<any>): void {
    // this.socket.on('onUpdatedBots:123', res => console.log('socket on res', res))
    // this.emitUpdatedBots(event);
  }

  async emitCreatedBots(entity: any): Promise<void> {
    // const event = await this.botService.getBots(entity);
    console.log("emitCreatedBots ", entity);

    this.botGateway.onCreatedBots(entity);
  }

  async emitUpdatedBots(event: any): Promise<void> {
    // const event = await this.botService.getBots({bot_user: "1"});
    // console.log("emitUpdatedBots ", event.connection.subscribers[0]);
    // console.log(event);
    

    // this.onUpdatedBots(event);
  }

  // @SubscribeMessage('onUpdatedBots')
  // onUpdatedBots(
  //   @MessageBody() data: string
  // ): void {
  //   // console.log('data: ', data);
  //   this.socket.emit('onUpdatedBots', data)

  // }
  
}
