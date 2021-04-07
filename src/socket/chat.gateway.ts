import { Logger } from "@nestjs/common"
import { SubscribeMessage, WebSocketGateway, WsResponse, OnGatewayConnection, WebSocketServer, ConnectedSocket, MessageBody, OnGatewayInit, OnGatewayDisconnect } from "@nestjs/websockets"
import { Socket, Server } from "socket.io"
import { Bots, Chats } from "../entities/index";

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() server: Server;
  
  
  
  private logger: Logger = new Logger('BotGateway');
  
  afterInit(server: Socket) {
    this.logger.log("Inicializado!")
  }
  
  log(client: Socket): void {
    var allClients = [];
this.server.on('connection', function(socket) {
   allClients.push(socket);

   socket.on('disconnect', function() {
      console.log('Got disconnect!');

      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
   });
});
  }

  onCreatedChats(entity: any): void {
      console.log('onCreatedChats', entity);
      
      this.server.emit(`onCreatedChats:${entity.cha_user}`, entity);
    }
    
    handleConnection(client: Socket) {
      this.logger.log(`client connected: ${client.id}`)
    }
    
    handleDisconnect(client: Socket) {
      this.logger.log(`client disconnected: ${client.id}`)
     }

     
  
}



