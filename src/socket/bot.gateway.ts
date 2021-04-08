import { Logger } from "@nestjs/common";
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway() 
export class BotGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger("BotGateway");

  afterInit(server: Socket) {
    this.logger.log("Inicializado!");
  }

  onCreatedBots(entity: any): void {
    console.log("onCreatedBots", entity);

    this.server.emit(`onCreatedBots:${entity.bot_user}`, entity);
  }

  @SubscribeMessage('onUpdatedBots')
  onUpdatedBots(
    @MessageBody() data: string
  ): void {
    // console.log('data: ', data);
    this.server.emit('onUpdatedBots', data)

  }
  // onUpdatedBots(entity: any): void {
  //   // console.log("onUpdatedBots", entity);
  //   console.log(this.socket);
    
  //   // this.socket.on('onUpdatedBots:123', res => console.log('socket on res', res))
  //   this.server.emit(`onUpdatedBots`, entity);
  // }

  handleConnection(client: Socket) {
    this.logger.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
  }
}
