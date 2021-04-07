import { Logger } from "@nestjs/common";
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway() 
export class BotGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger("SessionGateway");

  afterInit(server: Socket) {
    this.logger.log("Inicializado!");
  }

  onCreatedBots(entity: any): void {
    console.log("onCreatedBots", entity);

    this.server.emit(`onCreatedBots:${entity.bot_user}`, entity);
  }

  onUpdatedBots(entity: any): void {
    console.log("onUpdatedBots", entity);

    this.server.emit(`onUpdatedBots`, entity);
  }

  handleConnection(client: Socket) {
    this.logger.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
  }
}
